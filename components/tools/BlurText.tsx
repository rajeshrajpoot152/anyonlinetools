'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Shield,
  Upload,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Square,
  Circle,
  Shuffle,
  Code,
  Camera,
  AlertTriangle,
  Layers,
  Palette
} from 'lucide-react';
import ActionPanel from '../ui/ActionPanel';
import MobileStickyActionBar from '../ui/MobileStickyActionBar';

export interface BlurTextProps {
  locale?: string;
  ui?: Record<string, any>;
}

type TextMode = 'blur' | 'censor' | 'spoiler' | 'scramble';
type Direction = 'uniform' | 'left' | 'right' | 'both';
type RedactStyle = 'blur' | 'pixelate' | 'solid';
type Shape = 'rect' | 'circle';

interface RedactionBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: RedactStyle;
  shape: Shape;
  color: string;
  intensity: number;
}

export default function BlurText({ ui }: BlurTextProps) {
  // Global Active Workspace Mode: Text Generator vs Image Redactor
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');

  // -------------------------------------------------------------
  // MODE 1: Text & CSS Blur Generator State
  // -------------------------------------------------------------
  const [inputText, setInputText] = useState<string>('Confidential Password: P@ssw0rd2026!');
  const [textMode, setTextMode] = useState<TextMode>('blur');
  const [blurRadius, setBlurRadius] = useState<number>(6);
  const [blurDirection, setBlurDirection] = useState<Direction>('uniform');
  const [textColor, setTextColor] = useState<string>('#FFFFFF');
  const [bgColor, setBgColor] = useState<string>('#0F172A');
  const [fontSize, setFontSize] = useState<number>(18);
  const [isSpoilerRevealed, setIsSpoilerRevealed] = useState<boolean>(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Scramble Engine
  const scrambledText = useMemo(() => {
    if (!inputText) return '';
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/░▒▓█~';
    return inputText
      .split('')
      .map(char => (char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
      .join('');
  }, [inputText, textMode]);

  // Censor Engine
  const censoredText = useMemo(() => {
    if (!inputText) return '';
    return inputText.replace(/[a-zA-Z0-9]/g, '█');
  }, [inputText]);

  // CSS Generation
  const generatedCSS = useMemo(() => {
    if (textMode === 'blur') {
      return `filter: blur(${blurRadius}px); user-select: none; transition: filter 0.3s ease;`;
    }
    if (textMode === 'spoiler') {
      return `background-color: #000; color: transparent; cursor: pointer; user-select: none; border-radius: 4px; padding: 2px 4px;`;
    }
    return `/* Censor format: Solid unicode blocks */`;
  }, [textMode, blurRadius]);

  const cssTricksFallback = useMemo(() => {
    return `color: transparent; text-shadow: 0 0 ${blurRadius}px rgba(0,0,0,0.7); user-select: none;`;
  }, [blurRadius]);

  const reactNativeSnippet = useMemo(() => {
    return `<Text style={{ color: 'transparent', textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: ${blurRadius} }}>{text}</Text>`;
  }, [blurRadius]);

  const discordSpoiler = useMemo(() => `||${inputText}||`, [inputText]);
  const redditSpoiler = useMemo(() => `>!${inputText}!<`, [inputText]);

  // 1-Click Copy Helper
  const handleCopyCode = (textToCopy: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedFormat(id);
      setTimeout(() => setCopiedFormat(null), 2000);
    }
  };

  // Download Text Block as Transparent PNG Image
  const handleDownloadTextPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 32;
    ctx.font = `600 ${fontSize}px sans-serif`;
    const textMetrics = ctx.measureText(inputText);
    const textWidth = Math.max(200, textMetrics.width);
    const textHeight = fontSize * 1.5;

    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // Draw Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply Filter & Text
    ctx.font = `600 ${fontSize}px sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'middle';

    if (textMode === 'blur') {
      ctx.filter = `blur(${blurRadius}px)`;
      ctx.fillText(inputText, padding, canvas.height / 2);
    } else if (textMode === 'censor') {
      ctx.fillText(censoredText, padding, canvas.height / 2);
    } else if (textMode === 'scramble') {
      ctx.fillText(scrambledText, padding, canvas.height / 2);
    } else {
      ctx.fillStyle = '#000000';
      ctx.fillRect(padding, (canvas.height - textHeight) / 2, textWidth, textHeight);
    }

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blurred-text.png';
    a.click();
  };

  // -------------------------------------------------------------
  // MODE 2: Screenshot & Image Privacy Redactor State
  // -------------------------------------------------------------
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [redactStyle, setRedactStyle] = useState<RedactStyle>('blur');
  const [redactShape, setRedactShape] = useState<Shape>('rect');
  const [redactColor, setRedactColor] = useState<string>('#000000');
  const [redactIntensity, setRedactIntensity] = useState<number>(16);
  const [isInvertSpotlight, setIsInvertSpotlight] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<RedactionBox[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentBox, setCurrentBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [isSplitCompare, setIsSplitCompare] = useState<boolean>(false);
  const [splitPos, setSplitPos] = useState<number>(50);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load Sample Ticket Preset
  const handleLoadSampleTicket = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Support Ticket Header
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 0, canvas.width, 56);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('CRM Support Ticket #784112-Q · Internal Report', 24, 34);

    // Form fields
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Customer Name:', 32, 100);
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Jordan Powell (VIP Account)', 180, 100);

    ctx.fillStyle = '#64748B';
    ctx.font = '14px sans-serif';
    ctx.fillText('Contact Email:', 32, 150);
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('jordan.powell@enterprise-client.com', 180, 150);

    ctx.fillStyle = '#64748B';
    ctx.font = '14px sans-serif';
    ctx.fillText('Card on File:', 32, 200);
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Visa ending in 4532 (Exp 11/28)', 180, 200);

    ctx.fillStyle = '#64748B';
    ctx.font = '14px sans-serif';
    ctx.fillText('Session Token:', 32, 250);
    ctx.fillStyle = '#DC2626';
    ctx.font = 'mono 13px monospace';
    ctx.fillText('bearer_live_sec_9948a0fbc9219e4871c', 180, 250);

    // Security badge
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(32, 290, 656, 50);
    ctx.fillStyle = '#475569';
    ctx.font = '12px sans-serif';
    ctx.fillText('Confidential Internal Record · Drag redaction boxes over sensitive fields before sharing', 48, 320);

    setImageSrc(canvas.toDataURL());
    setBoxes([]);
  };

  // Image Upload Handler
  const handleImageUpload = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSrc(e.target.result as string);
        setBoxes([]);
      }
    };
    reader.readAsDataURL(file);
  };

  // Clipboard Paste Handler (Ctrl+V anywhere in window or canvas)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (activeTab !== 'image') return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleImageUpload(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [activeTab]);

  // Screen Capture Handler (getDisplayMedia)
  const handleScreenCapture = async () => {
    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert('Screen capture is not supported in this browser.');
        return;
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        setTimeout(() => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            setImageSrc(canvas.toDataURL('image/png'));
            setBoxes([]);
          }
          // Stop all video tracks
          stream.getTracks().forEach(track => track.stop());
        }, 300);
      };
    } catch {
      // User cancelled screen share prompt
    }
  };

  // Render Canvas with All Redactions
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!imageObjRef.current) {
      const img = new Image();
      img.onload = () => {
        imageObjRef.current = img;
        canvas.width = img.width;
        canvas.height = img.height;
        drawAll(ctx, img);
      };
      img.src = imageSrc;
    } else {
      const img = imageObjRef.current;
      drawAll(ctx, img);
    }
  }, [imageSrc, boxes, currentBox, redactStyle, redactShape, redactColor, redactIntensity, isInvertSpotlight, isSplitCompare, splitPos]);

  const drawSpotlight = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext('2d');
    if (offCtx) {
      offCtx.filter = `blur(${redactIntensity}px)`;
      offCtx.drawImage(img, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offCanvas, 0, 0);

      boxes.forEach(box => {
        ctx.save();
        ctx.beginPath();
        if (box.shape === 'circle') {
          ctx.ellipse(box.x + box.width / 2, box.y + box.height / 2, Math.abs(box.width) / 2, Math.abs(box.height) / 2, 0, 0, Math.PI * 2);
        } else {
          ctx.rect(box.x, box.y, box.width, box.height);
        }
        ctx.clip();
        ctx.drawImage(img, 0, 0);
        ctx.restore();
      });
    }
  };

  const drawAll = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, skipSplit: boolean = false) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If Before/After Split Comparison is active (and not an export run)
    if (isSplitCompare && !skipSplit) {
      const splitX = Math.round((canvas.width * splitPos) / 100);

      // 1. Draw original base image on entire canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. Draw redacted image clipped to left side (0 to splitX)
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, canvas.height);
      ctx.clip();

      if (isInvertSpotlight && boxes.length > 0) {
        drawSpotlight(ctx, img);
      } else {
        boxes.forEach(box => applyRedaction(ctx, img, box));
      }
      ctx.restore();

      // 3. Draw vertical dividing split line
      ctx.save();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, canvas.height);
      ctx.stroke();

      // Center knob circle
      ctx.fillStyle = '#2563EB';
      ctx.beginPath();
      ctx.arc(splitX, canvas.height / 2, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Badges
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 6;
      ctx.textAlign = 'left';
      ctx.fillText('REDACTED (AFTER)', Math.max(16, splitX - 130), 28);
      ctx.textAlign = 'right';
      ctx.fillText('ORIGINAL (BEFORE)', Math.min(canvas.width - 16, splitX + 140), 28);
      ctx.restore();
      return;
    }

    // Normal Mode: Draw base image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Invert / Spotlight Mode
    if (isInvertSpotlight && boxes.length > 0) {
      drawSpotlight(ctx, img);
      return;
    }

    // Normal Mode: Apply each redaction box
    boxes.forEach(box => {
      applyRedaction(ctx, img, box);
    });

    // Draw currently dragging box guide
    if (currentBox) {
      ctx.save();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      if (redactShape === 'circle') {
        ctx.beginPath();
        ctx.ellipse(currentBox.x + currentBox.w / 2, currentBox.y + currentBox.h / 2, Math.abs(currentBox.w) / 2, Math.abs(currentBox.h) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.strokeRect(currentBox.x, currentBox.y, currentBox.w, currentBox.h);
      }
      ctx.restore();
    }
  };

  const applyRedaction = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    box: RedactionBox
  ) => {
    const x = Math.min(box.x, box.x + box.width);
    const y = Math.min(box.y, box.y + box.height);
    const w = Math.abs(box.width);
    const h = Math.abs(box.height);

    if (w <= 1 || h <= 1) return;

    ctx.save();
    ctx.beginPath();
    if (box.shape === 'circle') {
      ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    } else {
      ctx.rect(x, y, w, h);
    }
    ctx.clip();

    if (box.style === 'solid') {
      // 100% Opaque Solid Censor Box (Irreversible Pixel Destruction)
      ctx.fillStyle = box.color;
      ctx.fillRect(x, y, w, h);
    } else if (box.style === 'pixelate') {
      // 8-Bit Mosaic Pixelate with Resolution-Aware Scaling
      const baseScale = Math.max(1, Math.floor(img.width / 1200));
      const blockSize = Math.max(6 * baseScale, Math.floor((box.intensity * baseScale) / 2));
      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.max(1, Math.floor(w / blockSize));
      offCanvas.height = Math.max(1, Math.floor(h / blockSize));
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(img, x, y, w, h, 0, 0, offCanvas.width, offCanvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offCanvas, 0, 0, offCanvas.width, offCanvas.height, x, y, w, h);
      }
    } else {
      // Gaussian Blur Filter
      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.filter = `blur(${box.intensity}px)`;
        offCtx.drawImage(img, x, y, w, h, 0, 0, w, h);
        ctx.drawImage(offCanvas, x, y);
      }
    }

    ctx.restore();
  };

  useEffect(() => {
    imageObjRef.current = null;
    redrawCanvas();
  }, [imageSrc, boxes, redrawCanvas]);

  // Keyboard Shortcuts: Ctrl+Z (Undo) and Escape (Cancel Drag)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'image') return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (e.key === 'Escape') {
        setIsDrawing(false);
        setCurrentBox(null);
        setStartPos(null);
        redrawCanvas();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, boxes, redrawCanvas]);

  // Robust Canvas Mouse & Touch Handlers (with mobile touch-action & changedTouches safety)
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!imageSrc) return;
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);
    setCurrentBox({ x: coords.x, y: coords.y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;
    const coords = getCanvasCoords(e);
    const box = {
      x: Math.min(startPos.x, coords.x),
      y: Math.min(startPos.y, coords.y),
      w: Math.abs(coords.x - startPos.x),
      h: Math.abs(coords.y - startPos.y)
    };
    setCurrentBox(box);
    redrawCanvas();
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentBox) return;
    setIsDrawing(false);
    if (currentBox.w > 4 && currentBox.h > 4) {
      const newBox: RedactionBox = {
        id: Math.random().toString(36).substring(7),
        x: currentBox.x,
        y: currentBox.y,
        width: currentBox.w,
        height: currentBox.h,
        style: redactStyle,
        shape: redactShape,
        color: redactColor,
        intensity: redactIntensity
      };
      setBoxes(prev => [...prev, newBox]);
    }
    setCurrentBox(null);
    setStartPos(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) e.preventDefault();
    handleMouseDown(e);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) e.preventDefault();
    handleMouseMove(e);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) e.preventDefault();
    handleMouseUp();
  };

  // Undo Last Redaction
  const handleUndo = () => {
    setBoxes(prev => prev.slice(0, -1));
  };

  // Reset Everything
  const handleReset = () => {
    setBoxes([]);
  };

  // Render Clean Offscreen Canvas for Full Redacted Export (Bypassing Split Slider Lines)
  const renderCleanExportCanvas = (): HTMLCanvasElement | null => {
    if (!imageSrc || !imageObjRef.current) return null;
    const img = imageObjRef.current;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = img.width;
    offCanvas.height = img.height;
    const ctx = offCanvas.getContext('2d');
    if (!ctx) return null;
    drawAll(ctx, img, true); // skipSplit = true ensures 100% full export
    return offCanvas;
  };

  // Download Redacted Image (Automatically Strips EXIF / Location Metadata)
  const handleDownloadImage = (format: 'png' | 'jpeg' | 'webp' = 'png') => {
    const exportCanvas = renderCleanExportCanvas() || canvasRef.current;
    if (!exportCanvas || !imageSrc) return;
    const mime = `image/${format}`;
    const url = exportCanvas.toDataURL(mime, 0.95);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redacted-image.${format}`;
    a.click();
  };

  // Copy Redacted Image to Clipboard (1-Click for Slack, Discord & WhatsApp Web)
  const handleCopyImageToClipboard = async () => {
    const exportCanvas = renderCleanExportCanvas() || canvasRef.current;
    if (!exportCanvas || !imageSrc) return;
    try {
      exportCanvas.toBlob(async (blob) => {
        if (!blob) return;
        if (typeof navigator !== 'undefined' && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2500);
        } else {
          handleDownloadImage('png');
        }
      }, 'image/png');
    } catch {
      handleDownloadImage('png');
    }
  };

  return (
    <div className="w-full">
      {/* Mode Selector Tabs (Text Blur Studio vs Screenshot Redactor) */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
              activeTab === 'text'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Mode 1: Text & CSS Blur</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
              activeTab === 'image'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Mode 2: Screenshot Redactor</span>
          </button>
        </div>

        {/* Security Badge */}
        <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 px-3 py-1 rounded-xl">
          <Lock className="w-3.5 h-3.5" />
          <span>100% In-Browser Privacy · Zero Uploads</span>
        </div>
      </div>

      {/* Security Advisory Callout (Google AI Cited Alert) */}
      <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-start space-x-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong className="font-bold">Security Standard:</strong> Blurring and pixelation are visual smears that modern AI font-matching models can occasionally decipher. For high-security data like passwords, bank accounts, or official identity numbers, always use <strong>Solid Black Box</strong> redaction.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODE 1: Text & CSS Blur Generator Workspace */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'text' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* Left Column: Controls & Stylers (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
            
            {/* Input Header */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <span>Type or Paste Text to Obfuscate</span>
              </label>
              <button
                type="button"
                onClick={() => setInputText('Top Secret Token: ghp_99xAbCdEf12345')}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sample Text
              </button>
            </div>

            {/* Input Textarea */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to blur or hide..."
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
            />

            {/* Obfuscation Mode Selector Tabs (from ASCII Magic) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Obfuscation Style:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: 'blur', label: 'Gaussian Blur', icon: Sliders },
                  { id: 'censor', label: 'Censor (████)', icon: Lock },
                  { id: 'spoiler', label: 'Spoiler (Reveal)', icon: Eye },
                  { id: 'scramble', label: 'Scramble', icon: Shuffle },
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setTextMode(mode.id as TextMode)}
                      className={`text-xs font-bold py-2 px-2 rounded-xl border flex items-center justify-center space-x-1.5 transition-all ${
                        textMode === mode.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Config Sliders & Color Chips */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-3.5">
              
              {/* Blur Radius Slider */}
              {textMode === 'blur' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Blur Radius:
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {blurRadius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={blurRadius}
                    onChange={(e) => setBlurRadius(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  
                  {/* Directional Progressive Blur (Framer Marketplace) */}
                  <div className="mt-2.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Progressive Direction (Framer Style):
                    </span>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { id: 'uniform', label: 'Uniform' },
                        { id: 'left', label: 'Left → Right' },
                        { id: 'right', label: 'Right → Left' },
                        { id: 'both', label: 'Edges' },
                      ].map(dir => (
                        <button
                          key={dir.id}
                          type="button"
                          onClick={() => setBlurDirection(dir.id as Direction)}
                          className={`text-[10px] font-semibold py-1 rounded-lg border transition-all ${
                            blurDirection === dir.id
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {dir.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Color Swatches (blur-my-text.lovable.app feature) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Text Color:
                  </span>
                  <div className="flex items-center space-x-1.5">
                    {['#FFFFFF', '#000000', '#38BDF8', '#F43F5E', '#10B981'].map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setTextColor(color)}
                        style={{ backgroundColor: color }}
                        className={`w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 transition-transform ${
                          textColor === color ? 'scale-125 ring-2 ring-blue-500' : ''
                        }`}
                        aria-label={`Select text color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Background:
                  </span>
                  <div className="flex items-center space-x-1.5">
                    {['#0F172A', '#000000', '#F8FAFC', '#1E293B', '#1E1B4B'].map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setBgColor(color)}
                        style={{ backgroundColor: color }}
                        className={`w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 transition-transform ${
                          bgColor === color ? 'scale-125 ring-2 ring-blue-500' : ''
                        }`}
                        aria-label={`Select background color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Font Size Slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Font Size:
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {fontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={36}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

            </div>

            {/* Download Transparent PNG Button */}
            <button
              type="button"
              onClick={handleDownloadTextPNG}
              className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download as Blurred Text PNG (Transparent)</span>
            </button>

          </div>

          {/* Right Column: Live Interactive Preview & Developer Drawer (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>Interactive Live Preview</span>
                </span>
                {textMode === 'spoiler' && (
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                    Tap to Reveal
                  </span>
                )}
              </div>

              {/* Live Preview Display Box */}
              <div
                style={{ backgroundColor: bgColor }}
                className="min-h-[160px] rounded-2xl p-6 flex items-center justify-center border border-slate-800 shadow-inner overflow-hidden select-none"
              >
                {textMode === 'blur' && (
                  <p
                    style={{
                      color: textColor,
                      fontSize: `${fontSize}px`,
                      filter: `blur(${blurRadius}px)`,
                      transition: 'filter 0.3s ease',
                      maskImage:
                        blurDirection === 'left'
                          ? 'linear-gradient(to right, transparent, black)'
                          : blurDirection === 'right'
                          ? 'linear-gradient(to left, transparent, black)'
                          : blurDirection === 'both'
                          ? 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)'
                          : undefined,
                      WebkitMaskImage:
                        blurDirection === 'left'
                          ? 'linear-gradient(to right, transparent, black)'
                          : blurDirection === 'right'
                          ? 'linear-gradient(to left, transparent, black)'
                          : blurDirection === 'both'
                          ? 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)'
                          : undefined
                    }}
                    className="font-bold text-center break-words max-w-full"
                  >
                    {inputText || 'Your blurred text appears here'}
                  </p>
                )}

                {textMode === 'censor' && (
                  <p
                    style={{ color: textColor, fontSize: `${fontSize}px` }}
                    className="font-mono font-bold tracking-widest text-center break-words max-w-full"
                  >
                    {censoredText || '████████████'}
                  </p>
                )}

                {textMode === 'spoiler' && (
                  <button
                    type="button"
                    onClick={() => setIsSpoilerRevealed(prev => !prev)}
                    style={{
                      fontSize: `${fontSize}px`,
                      backgroundColor: isSpoilerRevealed ? 'transparent' : '#000000',
                      color: isSpoilerRevealed ? textColor : 'transparent',
                      filter: isSpoilerRevealed ? 'none' : 'blur(4px)'
                    }}
                    className="font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition-all cursor-pointer"
                    title="Click to toggle spoiler reveal"
                  >
                    {inputText || 'Click to reveal hidden spoiler'}
                  </button>
                )}

                {textMode === 'scramble' && (
                  <p
                    style={{ color: textColor, fontSize: `${fontSize}px` }}
                    className="font-mono font-bold text-center break-words max-w-full"
                  >
                    {scrambledText || 'Glitched cipher text'}
                  </p>
                )}
              </div>

              {/* Developer & Platform Code Drawer */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  ⚡ 1-Click Formats & Developer Code:
                </span>
                
                <div className="space-y-2">
                  {/* CSS Filter */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate max-w-[70%]">
                      {generatedCSS}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(generatedCSS, 'css')}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center space-x-1"
                    >
                      {copiedFormat === 'css' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>Copy CSS</span>
                    </button>
                  </div>

                  {/* CSS-Tricks Fallback */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate max-w-[70%]">
                      {cssTricksFallback}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(cssTricksFallback, 'csstricks')}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-all flex items-center space-x-1"
                    >
                      {copiedFormat === 'csstricks' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>Fallback</span>
                    </button>
                  </div>

                  {/* Social Spoilers: Discord & Reddit */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyCode(discordSpoiler, 'discord')}
                      className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center justify-between hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <span className="truncate">Discord ||spoiler||</span>
                      {copiedFormat === 'discord' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(redditSpoiler, 'reddit')}
                      className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/60 text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center justify-between hover:bg-orange-600 hover:text-white transition-all"
                    >
                      <span className="truncate">Reddit &gt;!spoiler!&lt;</span>
                      {copiedFormat === 'reddit' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* React Native Snippet */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate max-w-[70%]">
                      {reactNativeSnippet}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(reactNativeSnippet, 'rn')}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-all flex items-center space-x-1"
                    >
                      {copiedFormat === 'rn' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>React Native</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Obfuscated Text Output Action Bar (Copy & Share) */}
            <div className="pt-2">
              <ActionPanel
                content={generatedCSS}
                stats={[
                  { label: 'Style', value: textMode.toUpperCase() },
                  { label: 'Radius', value: `${blurRadius}px` },
                  { label: 'Length', value: `${inputText.length} chars` }
                ]}
                showWhatsAppShare={true}
                downloadFileName="blurred-text-css.txt"
              />
            </div>

            {/* Trust Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>⚡ Zero CPU latency · Instant Generation</span>
              <span>100% Free Forever</span>
            </div>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODE 2: Screenshot, Photo & Document Redactor Workspace */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'image' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
          
          {/* Top Control Bar: Upload, Ctrl+V, Screen Capture, Mode, Shapes & Actions */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            
            {/* Input Actions */}
            <div className="flex items-center space-x-2 flex-wrap gap-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                onClick={handleScreenCapture}
                className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center space-x-1.5 active:scale-95 border border-slate-200 dark:border-slate-700"
                title="Capture entire screen or tab directly"
              >
                <Camera className="w-3.5 h-3.5 text-blue-500" />
                <span>Capture Screen</span>
              </button>

              <button
                type="button"
                onClick={handleLoadSampleTicket}
                className="text-xs font-semibold px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Load sample support ticket with test credentials"
              >
                Load Sample Ticket
              </button>
            </div>

            {/* Triad of Redaction Styles (EditTextImage feature) */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setRedactStyle('blur')}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                  redactStyle === 'blur'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Blur
              </button>
              <button
                type="button"
                onClick={() => setRedactStyle('pixelate')}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                  redactStyle === 'pixelate'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Pixelate
              </button>
              <button
                type="button"
                onClick={() => setRedactStyle('solid')}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                  redactStyle === 'solid'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Solid Black (100% Censor)
              </button>
            </div>

            {/* Shapes & Controls */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setRedactShape('rect')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    redactShape === 'rect' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-2xs' : 'text-slate-400'
                  }`}
                  title="Rectangle Mask (Text & lines)"
                >
                  <Square className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setRedactShape('circle')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    redactShape === 'circle' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-2xs' : 'text-slate-400'
                  }`}
                  title="Ellipse Mask (Avatars & stamps)"
                >
                  <Circle className="w-4 h-4" />
                </button>
              </div>

              {/* Invert / Spotlight Toggle (Canva & ClickForArt) */}
              <button
                type="button"
                onClick={() => setIsInvertSpotlight(prev => !prev)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all ${
                  isInvertSpotlight
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
                title="Blur everything outside the box to spotlight only selected text"
                aria-label="Blur everything outside the box to spotlight only selected text"
              >
                Spotlight
              </button>

              {/* Before / After Split Slider Toggle (AirBrush & Redacted style) */}
              <button
                type="button"
                onClick={() => setIsSplitCompare(prev => !prev)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all flex items-center space-x-1 ${
                  isSplitCompare
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
                title="Toggle interactive Before / After split comparison slider"
                aria-label="Toggle interactive Before / After split comparison slider"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Split Compare</span>
              </button>

              {/* Intensity Slider */}
              <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Intensity:</span>
                <input
                  type="range"
                  min={6}
                  max={40}
                  value={redactIntensity}
                  onChange={(e) => setRedactIntensity(Number(e.target.value))}
                  className="w-16 accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Undo & Reset */}
              <button
                type="button"
                onClick={handleUndo}
                disabled={boxes.length === 0}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Undo last redaction box"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Before / After Split Slider Range Control */}
          {imageSrc && isSplitCompare && (
            <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-950/40 p-3 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-xs">
              <span className="font-bold text-blue-700 dark:text-blue-300 flex-shrink-0">
                ◀ Slide Split Divider ({splitPos}%):
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={splitPos}
                onChange={(e) => setSplitPos(Number(e.target.value))}
                className="flex-1 accent-blue-600 cursor-pointer"
                aria-label="Before/After Split comparison position"
              />
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                Redacted (Left) | Original (Right)
              </span>
            </div>
          )}

          {/* Canvas Interactive Display Area */}
          <div className="relative min-h-[380px] bg-slate-100 dark:bg-slate-950/60 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center p-4 overflow-hidden">
            {!imageSrc ? (
              <div className="text-center py-12 px-4 max-w-md">
                <div className="w-14 h-14 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Paste a screenshot or select a photo
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  Press <strong>Ctrl+V</strong> anywhere on this page to paste your clipboard screenshot, or drag and drop an image file.
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
                  >
                    Select File (PNG, JPG, WEBP)
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSampleTicket}
                    className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-all"
                  >
                    Load Sample Ticket
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative max-w-full max-h-[600px] overflow-auto flex items-center justify-center shadow-lg rounded-xl">
                <canvas
                  ref={canvasRef}
                  style={{ touchAction: 'none' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="max-w-full max-h-[580px] object-contain cursor-crosshair rounded-xl select-none"
                  title="Click and drag over sensitive text to redact"
                  aria-label="Redaction image workspace canvas"
                />
              </div>
            )}
          </div>

          {/* Bottom Action & Export Bar */}
          {imageSrc && (
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {boxes.length} {boxes.length === 1 ? 'box' : 'boxes'} redacted
                </span>
                <span>· Drag on image to add boxes · Ctrl+Z to undo</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={handleCopyImageToClipboard}
                  className="text-xs font-bold px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
                  title="Copy redacted image to clipboard (Paste directly into Slack, WhatsApp, or Email)"
                  aria-label="Copy redacted image to clipboard"
                >
                  {copiedImage ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedImage ? 'Copied to Clipboard!' : 'Copy Image (Ctrl+C)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadImage('png')}
                  className="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Clean PNG (100% EXIF-Stripped)</span>
                </button>
              </div>
            </div>
          )}

          {/* Common Redaction Targets (Redacted.app Intelligence Benchmark) */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Common Items People Redact Before Sharing:</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              {[
                { icon: '👤', title: 'Names & Usernames', desc: 'Customer tags, profile IDs' },
                { icon: '📞', title: 'Phones & Emails', desc: 'Personal & business contact' },
                { icon: '🏠', title: 'Addresses & IDs', desc: 'Order tracking, street names' },
                { icon: '💬', title: 'Private Chats', desc: 'Slack, WhatsApp, DM previews' },
                { icon: '💳', title: 'Cards & Balances', desc: 'CVV, balances, API keys' }
              ].map((item, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-base mb-0.5">{item.icon}</div>
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{item.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-Flight "Quick Check Before You Share" Checklist */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>Pre-Flight Privacy Checklist (Verify Before Sharing):</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Customer names & emails hidden</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Card digits, OTPs & passwords censored</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Browser tabs & reflections clean</span>
              </label>
            </div>
          </div>

        </div>
      )}

      {/* Mobile Sticky Action Bar */}
      <MobileStickyActionBar
        content={activeTab === 'text' ? inputText : (imageSrc ? 'image' : '')}
        onClear={() => {
          if (activeTab === 'text') setInputText('');
          else setBoxes([]);
        }}
        countLabel={activeTab === 'text' ? `${blurRadius}px blur` : `${boxes.length} boxes`}
      />
    </div>
  );
}
