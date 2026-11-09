import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  AlertCircle,
  Sparkles,
  Instagram,
  Linkedin,
  Youtube,
  Globe
} from 'lucide-react';
import { sendContactMessage } from '../services/api';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Commercial Video Directing & Editing');
  const [budget, setBudget] = useState('$2,000 - $5,000');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, email address, and project details.');
      return;
    }

    setSending(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const confirmation = await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        projectType,
        budget,
        message: message.trim()
      });

      setSuccessMsg(confirmation);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send message. Please call 9360302306 directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Bar */}
      <div className="border-b border-zinc-800/80 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Studio Communication</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          Contact DHINESH KUMAR
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Inquire about commercial video directing, film color grading in DaVinci Resolve Studio, or editorial photography commissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Cards & Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Direct Call & WhatsApp Action Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-[#121218] border border-amber-500/30 shadow-2xl space-y-6">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">Direct Hotline</div>
              <h2 className="text-xl font-bold text-white mt-1">Get in Touch Immediately</h2>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                For urgent commercial inquiries, date holds, and post-production turnarounds, call or message directly.
              </p>
            </div>

            <div className="space-y-3">
              {/* Click-to-Call Button */}
              <a
                href="tel:9360302306"
                className="w-full py-3.5 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-sm flex items-center justify-between shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 fill-current" />
                  <span>Call 9360302306</span>
                </div>
                <span className="text-xs font-mono tracking-wider uppercase bg-black/10 px-2 py-0.5 rounded">
                  Direct Line
                </span>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919360302306?text=Hi%20Dhinesh,%20I%20would%20like%20to%20discuss%20a%20creative%20project"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-between shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </div>
                <span className="text-xs font-mono tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded">
                  Fast Reply
                </span>
              </a>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:2kdhinesh2k@gmail.com" className="font-mono text-zinc-200 hover:text-amber-300 transition-colors">
                  2kdhinesh2k@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Ramanathapuram, Tamil Nadu, India · Available Worldwide</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Typical response time: Under 2 hours</span>
              </div>
            </div>
          </div>

          {/* Social Profiles & Presence */}
          <div className="p-6 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3">
            <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
              Online Profiles & Portfolios
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700"
              >
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>YouTube</span>
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700"
              >
                <Globe className="w-4 h-4 text-teal-400" />
                <span>Vimeo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#121218] border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Send a Project Brief</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Fill in the details below to receive a personalized estimate, treatment concept, or timeline.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
                <Check className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Inquiry Sent Successfully!</div>
                  <div className="text-[11px] mt-0.5">{successMsg}</div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Commercial Video Directing & Editing</option>
                    <option>DaVinci Resolve Studio Color Grading</option>
                    <option>Fashion & Editorial Photography</option>
                    <option>Music Film & Visualizer Production</option>
                    <option>Post-Production Sound & Finishing</option>
                    <option>Other Creative Engagement</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Estimated Budget Range</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option>$1,000 - $3,000 (Short Form / Socials)</option>
                  <option>$3,000 - $8,000 (Brand Commercial / Music Video)</option>
                  <option>$8,000 - $20,000+ (Full Campaign / Feature Directing)</option>
                  <option>To Be Determined / Flexible</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Project Overview & Timeline *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell Dhinesh about your creative vision, references, shoot schedule, or delivery deadline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{sending ? 'Transmitting Brief...' : 'Transmit Project Brief'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
