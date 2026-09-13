import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Camera,
  Upload,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileImage,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import { DetailedService } from '../../data/detailedServicesData';

interface DescribeProblemViewProps {
  service: DetailedService;
  emergencyType?: string;
  onBack: () => void;
  onSubmitProblem: (problemDetails: {
    description: string;
    photos: string[];
    notes: string;
  }) => void;
}

export const DescribeProblemView: React.FC<DescribeProblemViewProps> = ({
  service,
  emergencyType,
  onBack,
  onSubmitProblem,
}) => {
  const [description, setDescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const MAX_PHOTOS = 5;

  const handleExampleClick = (exampleText: string) => {
    setDescription(exampleText);
    setErrorMessage(null);
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > MAX_PHOTOS) {
      setErrorMessage(`Maximum limit is ${MAX_PHOTOS} photos. You can upload up to ${MAX_PHOTOS - photos.length} more.`);
      return;
    }

    setUploading(true);
    setErrorMessage(null);

    // Simulate upload reading
    setTimeout(() => {
      const newPhotoUrls: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          setErrorMessage('File size exceeds 5MB limit.');
          return;
        }
        // Create object URL for preview
        const url = URL.createObjectURL(file);
        newPhotoUrls.push(url);
      });

      setPhotos((prev) => [...prev, ...newPhotoUrls]);
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }, 600);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== index));
    setErrorMessage(null);
  };

  const isFormValid = description.trim().length >= 5;

  const handleSubmit = () => {
    if (!isFormValid) {
      setErrorMessage('Please provide a brief description of the problem (at least 5 characters).');
      return;
    }
    onSubmitProblem({
      description: description.trim(),
      photos,
      notes: notes.trim(),
    });
  };

  // Example problems based on service category
  const exampleProblems = [
    `My ${service.name.toLowerCase()} is leaking from the bottom and making a strange sound.`,
    `Needs urgent repair and replacement part for ${service.categoryName.toLowerCase()}.`,
    `Not working properly after sudden power fluctuation.`,
  ];

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200 relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-amber-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-amber-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-800" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Describe Your Problem</h1>
            <p className="text-[10px] text-amber-800 font-medium">{service.name} {emergencyType ? `· (${emergencyType})` : ''}</p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
          Step 1 of 2
        </span>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-5 max-w-md mx-auto w-full">
        
        {/* Question & Examples */}
        <div className="space-y-2">
          <label className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <span>What is the problem? *</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            rows={3}
            placeholder="e.g. My kitchen tap is leaking from the bottom and flooding the counter."
            className="w-full p-3.5 rounded-2xl bg-white border border-amber-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 shadow-sm transition resize-none"
          />

          {/* Helpful Examples */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" /> Helpful Examples (Tap to use):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {exampleProblems.map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(ex)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[11px] text-slate-700 font-medium text-left transition active:scale-95"
                >
                  "{ex}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-3 pt-2 border-t border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileImage className="w-4 h-4 text-amber-700" /> Upload Photos ({photos.length}/{MAX_PHOTOS})
              </h3>
              <p className="text-[10px] text-slate-600 mt-0.5">
                Photos help professionals understand the problem before arriving.
              </p>
            </div>
          </div>

          {/* Hidden File & Camera Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFilesSelected}
            className="hidden"
          />

          {/* Upload & Camera Trigger Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={photos.length >= MAX_PHOTOS || uploading}
              className="py-3 px-4 rounded-2xl bg-white border border-amber-300 hover:border-amber-400 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 text-amber-700" />
              <span>Upload from Gallery</span>
            </button>

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={photos.length >= MAX_PHOTOS || uploading}
              className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 transition active:scale-95 disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              <span>Take Photo (Camera)</span>
            </button>
          </div>

          {/* Loading State */}
          {uploading && (
            <div className="p-3 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center gap-2 text-amber-900 text-xs font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-amber-800" />
              <span>Uploading and optimizing photos...</span>
            </div>
          )}

          {/* Error State */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Image Previews */}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pt-1">
              {photos.map((url, idx) => (
                <div key={idx} className="relative group rounded-2xl overflow-hidden border border-amber-300 aspect-square bg-amber-100 shadow-sm">
                  <img
                    src={url}
                    alt={`Upload preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg transition transform hover:scale-110"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[9px] px-1.5 py-0.5 rounded-md font-mono">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Optional Notes Section */}
        <div className="space-y-1.5 pt-2 border-t border-amber-200">
          <label className="text-xs font-bold text-slate-900 block">
            Optional Notes for Professional <span className="text-slate-500 font-normal">(Gate code, parking, tool preference)</span>
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Ring doorbell twice, parking available near elevator"
            className="w-full p-3 rounded-xl bg-white border border-amber-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-sm transition"
          />
        </div>

        {/* Security / Assurance Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 font-bold">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">HomeFix Verified Guarantee</h4>
            <p className="text-[10px] text-slate-700">Professionals arrive fully equipped based on your problem description.</p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Continue CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200 px-4 py-3 flex items-center justify-between max-w-[390px] sm:max-w-md mx-auto shadow-lg">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Problem Statement</span>
          <span className={`text-xs font-bold ${isFormValid ? 'text-emerald-700' : 'text-amber-800'}`}>
            {isFormValid ? '✓ Ready to Continue' : 'Please enter description'}
          </span>
        </div>

        <button
          type="button"
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`px-6 py-3 rounded-2xl text-xs font-extrabold shadow-lg transition flex items-center gap-2 ${
            isFormValid
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30 active:scale-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Continue to Booking</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
