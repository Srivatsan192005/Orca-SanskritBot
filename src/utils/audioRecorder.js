/**
 * Client-Side Audio Recording & Temporary Storage Service
 * Uses HTML5 MediaRecorder API to record raw learner microphone audio into memory Blobs.
 * Allows instant replay, A/B comparison against standard TTS, and session persistence.
 */

let mediaRecorderInstance = null;
let audioStreamInstance = null;
let recordedChunks = [];

/**
 * Starts recording microphone audio stream
 */
export async function startAudioCapture() {
  recordedChunks = [];

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.warn("getUserMedia is not supported on this browser.");
    return false;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStreamInstance = stream;

    // Detect supported mimeType
    const mimeTypes = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/wav'
    ];
    let selectedMime = '';
    for (const m of mimeTypes) {
      if (MediaRecorder.isTypeSupported(m)) {
        selectedMime = m;
        break;
      }
    }

    const options = selectedMime ? { mimeType: selectedMime } : {};
    const recorder = new MediaRecorder(stream, options);

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorderInstance = recorder;
    recorder.start(100); // 100ms slices for responsive capture
    return true;
  } catch (err) {
    console.warn("Could not start audio capture:", err);
    return false;
  }
}

/**
 * Stops recording microphone stream and generates an in-memory audio URL
 * @returns {Promise<{ audioUrl: string | null, blob: Blob | null, durationMs: number }>}
 */
export function stopAudioCapture() {
  return new Promise((resolve) => {
    if (!mediaRecorderInstance || mediaRecorderInstance.state === 'inactive') {
      cleanupStream();
      resolve({ audioUrl: null, blob: null, durationMs: 0 });
      return;
    }

    const startTime = Date.now();

    mediaRecorderInstance.onstop = () => {
      const mimeType = mediaRecorderInstance.mimeType || 'audio/webm';
      const blob = new Blob(recordedChunks, { type: mimeType });
      const audioUrl = blob.size > 0 ? URL.createObjectURL(blob) : null;
      const durationMs = Date.now() - startTime;

      cleanupStream();
      resolve({ audioUrl, blob, durationMs });
    };

    try {
      mediaRecorderInstance.stop();
    } catch (e) {
      cleanupStream();
      resolve({ audioUrl: null, blob: null, durationMs: 0 });
    }
  });
}

function cleanupStream() {
  if (audioStreamInstance) {
    audioStreamInstance.getTracks().forEach((track) => {
      try { track.stop(); } catch (e) {}
    });
    audioStreamInstance = null;
  }
  mediaRecorderInstance = null;
}

/**
 * Audio Player utility to play back a given audio URL
 */
let currentAudioPlayer = null;

export function playRecordedAudio(audioUrl, onEnd = null) {
  if (!audioUrl) return;

  if (currentAudioPlayer) {
    try {
      currentAudioPlayer.pause();
      currentAudioPlayer.currentTime = 0;
    } catch (e) {}
  }

  const audio = new Audio(audioUrl);
  currentAudioPlayer = audio;

  audio.onended = () => {
    currentAudioPlayer = null;
    if (onEnd) onEnd();
  };

  audio.onerror = () => {
    currentAudioPlayer = null;
    if (onEnd) onEnd();
  };

  audio.play().catch((err) => {
    console.warn("Replay error:", err);
    if (onEnd) onEnd();
  });
}

export function stopRecordedAudio() {
  if (currentAudioPlayer) {
    try {
      currentAudioPlayer.pause();
      currentAudioPlayer.currentTime = 0;
    } catch (e) {}
    currentAudioPlayer = null;
  }
}
