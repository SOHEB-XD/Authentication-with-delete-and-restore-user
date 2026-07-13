import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, leftPanelGraphic, subtitle }) => {
  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8 min-h-screen flex items-center justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col md:flex-row bg-white/85 rounded-3xl overflow-hidden shadow-glass backdrop-blur-xl border border-white/50 w-full min-h-[650px]"
      >
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-purple-500/30 to-blue-500/30 relative p-10 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_60%)] -z-10" />

          <div className="relative z-10 mt-10">
            {leftPanelGraphic || (
              <h1 className="text-4xl font-extrabold text-white uppercase tracking-tighter leading-tight">
                SMART<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                  AUTHENTICATION
                </span>
              </h1>
            )}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-10 w-48 h-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff8a00,#e52e71,#9b2cfa)] shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.3),0_20px_40px_rgba(0,0,0,0.2)] animate-float z-20" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[90px] w-48 h-10 bg-white/20 rounded-full blur-md animate-shadowScale" />
          </div>

          <div className="relative z-10 text-white mt-48">
            <p className="text-white/90 leading-relaxed">
              {subtitle || "Experience smarter conversations with AI-powered responses, personalized insights & seamless productivity across every interaction."}
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
