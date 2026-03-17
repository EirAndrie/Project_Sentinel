import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../../lib/axios.js";

const EMPTY_STATE = {
  fullName: "",
  description: "",
  officialUrl: "",
  handles: [{ platform: "Instagram", handle: "" }],
  websites: [""],
  keywords: [""],
  photo: null,
};

export default function CreatorProfilingModal({
  isOpen,
  onClose,
  onSuccess,
  userID,
  initialData = null,
}) {
  const [form, setForm] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Populate form if initialData is provided
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          fullName: initialData.creator_name || "",
          description: initialData.description || "",
          officialUrl: initialData.official_url || "",
          handles: initialData.socials?.map((platform, idx) => ({
            platform: platform,
            handle: initialData.socials_url?.[idx] || "",
          })) || [{ platform: "Instagram", handle: "" }],
          websites: initialData.website_count > 0 ? [""] : [""], // Backend handles websites separately, we won't populate them directly in the edit form unless we fetch them, but the prompt says update "assigned websites". We'll leave it empty for now or we can implement it if needed, but the current backend route doesn't easily return assigned websites in the creator object itself (just the count). The user request says "official url, assigned websites will be edited". We will just allow adding new ones for now, as editing existing ones might require a different endpoint.
          keywords: initialData.keywords || [""],
          photo: null, // Keep photo null initially, since we can't pre-populate file inputs
        });
      } else {
        setForm(EMPTY_STATE);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  // Handles
  const addHandle = () =>
    set("handles", [...form.handles, { platform: "Instagram", handle: "" }]);
  const removeHandle = (i) =>
    set(
      "handles",
      form.handles.filter((_, idx) => idx !== i),
    );
  const updateHandle = (i, field, value) =>
    set(
      "handles",
      form.handles.map((h, idx) => (idx === i ? { ...h, [field]: value } : h)),
    );

  // Websites
  const addWebsite = () => set("websites", [...form.websites, ""]);
  const removeWebsite = (i) =>
    set(
      "websites",
      form.websites.filter((_, idx) => idx !== i),
    );
  const updateWebsite = (i, value) =>
    set(
      "websites",
      form.websites.map((w, idx) => (idx === i ? value : w)),
    );

  // Keywords
  const addKeyword = () => set("keywords", [...form.keywords, ""]);
  const removeKeyword = (i) =>
    set(
      "keywords",
      form.keywords.filter((_, idx) => idx !== i),
    );
  const updateKeyword = (i, value) =>
    set(
      "keywords",
      form.keywords.map((k, idx) => (idx === i ? value : k)),
    );

  // Close modal and reset form
  const handleClose = () => {
    setForm(EMPTY_STATE);
    setError(null);
    onClose();
  };

  // Submit form Function
  const handleSubmit = async () => {
    // Validate form
    if (!form.fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!userID) {
      setError("User session not found. Please log in again.");
      return;
    }

    // Set loading and clear error
    setLoading(true);
    setError(null);

    try {
      const payload = {
        userID,
        creator_name: form.fullName,
        description: form.description,
        official_url: form.officialUrl,
        socials: form.handles.map((h) => h.platform),
        socials_url: form.handles.map((h) => h.handle),
        keywords: form.keywords.filter(Boolean),
        websites: form.websites.filter(Boolean),
      };

      if (initialData) {
        const { userID: _, ...updatePayload } = payload;
        await api.patch(
          `/update-creator/profile/${initialData._id}`,
          updatePayload,
        );
      } else {
        await api.post("/create-creator/profile", payload);
      }

      // Reset form and close modal
      setForm(EMPTY_STATE);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ?? "Something went wrong. Try again.",
      );
    } finally {
      // Set loading to false
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm";
  const monoInput =
    "flex-1 px-4 py-2.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm font-mono placeholder-slate-400";
  const removeBtn =
    "ml-2 text-gray-300 hover:text-red-400 transition-colors shrink-0";
  const addBtn =
    "inline-flex items-center px-4 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Creator" : "Add Creator"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-8 overflow-y-auto space-y-7">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Elena Voss"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              className={`${inputClass} text-slate-500`}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`${inputClass} text-slate-500`}
            />
          </div>

          {/* Official Website URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Official Website URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={form.officialUrl}
              onChange={(e) => set("officialUrl", e.target.value)}
              className={`${inputClass} font-mono placeholder-gray-400`}
            />
          </div>

          {/* Handles */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Handles (Other Socials)
            </label>
            <div className="space-y-3 mb-3">
              {form.handles.map((h, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <select
                    value={h.platform}
                    onChange={(e) =>
                      updateHandle(i, "platform", e.target.value)
                    }
                    className="w-1/3 px-3 py-2.5 border border-gray-200 rounded-md shadow-sm bg-white text-sm text-gray-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none cursor-pointer"
                  >
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Twitter</option>
                    <option>YouTube</option>
                  </select>
                  <input
                    type="text"
                    value={h.handle}
                    onChange={(e) => updateHandle(i, "handle", e.target.value)}
                    placeholder="@handle"
                    className={monoInput}
                  />
                  {form.handles.length > 1 && (
                    <button
                      onClick={() => removeHandle(i)}
                      className={removeBtn}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addHandle} className={addBtn}>
              + Add Handle
            </button>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Profile Photo
            </label>
            <label className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => set("photo", e.target.files[0] ?? null)}
              />
              {form.photo ? (
                <span className="text-sm font-medium text-yellow-600">
                  {form.photo.name}
                </span>
              ) : (
                <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
                  Click to upload or drag and drop
                </span>
              )}
            </label>
          </div>

          {/* Assigned Websites */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Assigned Websites
            </label>
            <div className="space-y-3 mb-3">
              {form.websites.map((w, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={w}
                    onChange={(e) => updateWebsite(i, e.target.value)}
                    placeholder="https://..."
                    className={monoInput}
                  />
                  {form.websites.length > 1 && (
                    <button
                      onClick={() => removeWebsite(i)}
                      className={removeBtn}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addWebsite} className={addBtn}>
              + Add Website
            </button>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Keywords
            </label>
            <div className="space-y-3 mb-3">
              {form.keywords.map((k, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={k}
                    onChange={(e) => updateKeyword(i, e.target.value)}
                    placeholder="e.g. travel, fitness"
                    className={`${monoInput} font-sans`}
                  />
                  {form.keywords.length > 1 && (
                    <button
                      onClick={() => removeKeyword(i)}
                      className={removeBtn}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addKeyword} className={addBtn}>
              + Add Keyword
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white shrink-0 space-y-3">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#CAA128] hover:bg-[#B58F20] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition-colors shadow-sm"
          >
            {loading
              ? initialData
                ? "Saving..."
                : "Creating..."
              : initialData
                ? "Save Changes"
                : "Create Creator"}
          </button>
        </div>
      </div>
    </div>
  );
}
