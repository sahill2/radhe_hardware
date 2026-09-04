"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, User, Calendar, CheckCircle2, Clock } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch("/api/enquiries");
        if (res.ok) {
          const data = await res.json();
          setEnquiries(data.enquiries || []);
        }
      } catch (err) {
        console.error("Failed to load enquiries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          ગ્રાહક પૂછપરછ અને સંદેશાઓ (Customer Enquiries)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          વેબસાઈટ પરથી આવેલી પૂછપરછ અને કોલબેક વિનંતીઓ
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs font-medium">
          પૂછપરછ લોડ થઈ રહી છે...
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-900">હજુ કોઈ નવી પૂછપરછ નથી</p>
          <p className="text-xs text-slate-500 mt-1">
            ગ્રાહકો સામાન્ય રીતે વોટ્સએપ અને ફોન દ્વારા સીધો સંપર્ક કરે છે.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-sm text-slate-900">{enq.name}</span>
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <a href={`tel:${enq.phone}`} className="hover:text-[#1E8E3E] hover:underline">
                  {enq.phone}
                </a>
              </div>

              {enq.productName && (
                <div className="bg-slate-50 p-2.5 rounded-xl text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">પ્રોડક્ટ</span>
                  <span className="font-semibold text-slate-900">{enq.productName}</span>
                  {enq.variant && (
                    <span className="text-emerald-800 text-[11px] block mt-0.5">
                      સાઈઝ: {enq.variant}
                    </span>
                  )}
                </div>
              )}

              {enq.message && (
                <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{enq.message}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
