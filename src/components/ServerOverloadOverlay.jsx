import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVER_LOGS = [
  { type: 'crit', text: '[CRIT] 2026-08-31 07:15:38 UTC [cluster-ingress-01] unix:/run/app.sock failed (111: Connection refused)' },
  { type: 'err', text: '[ERR]  FATAL: [v8::WorkerPool] JavaScript heap out of memory (allocation limit exceeded: 8192 MB)' },
  { type: 'err', text: '[ERR]  HTTP 520 / 503 SERVICE_UNAVAILABLE: upstream pool [api-nodes-prod] returned 0 healthy endpoints' },
  { type: 'warn', text: '[WARN] Ingress traffic surge: 184,520 req/s (threshold: 25,000 req/s)' },
  { type: 'code', text: '       goroutine 81940 [running]:' },
  { type: 'code', text: '       github.com/engine/core/router.(*Cluster).ServeHTTP(0xc0021b0000, 0x18f4a0, 0xc001b94000)' },
  { type: 'code', text: '           /build/src/router/cluster.go:342 +0x4e2' },
  { type: 'code', text: '       net/http.serverHandler.ServeHTTP(0xc00009c5a0, 0x192a00, 0xc0021a8000)' },
  { type: 'code', text: '           /usr/local/go/src/net/http/server.go:2938 +0x3a4' },
  { type: 'sys', text: '[SYS]  Active TCP Sockets: 65,535/65,535 (EXHAUSTED) | CPU: 100.0% | Swap: 98.4%' },
  { type: 'action', text: '[FAILOVER] Cloudflare Edge attempting automatic failover to replica...' }
];

export default function ServerOverloadOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(true);

  useEffect(() => {
    let showTimer;
    let hideTimer;

    const startCycle = () => {
      // Trigger every 15 seconds
      showTimer = setTimeout(() => {
        setIsVisible(true);
        setDisplayedLogs([]);

        // Stream logs in real-time
        SERVER_LOGS.forEach((log, index) => {
          setTimeout(() => {
            setDisplayedLogs(prev => [...prev, log]);
          }, 100 + index * 140);
        });

        // Hide after 4 seconds and repeat cycle
        hideTimer = setTimeout(() => {
          setIsVisible(false);
          startCycle();
        }, 4000);
      }, 15000);
    };

    startCycle();

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cloudflare-error-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] bg-[#111114] text-[#e0e0e0] font-sans overflow-y-auto select-none"
          style={{ backgroundColor: '#0d0d11' }}
        >
          {/* Top subtle accent bar */}
          <div className="w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />

          <div className="max-w-5xl mx-auto px-6 py-10 sm:py-14">
            
            {/* Header: Error 520 & Ray ID */}
            <div className="border-b border-white/10 pb-6 mb-10">
              <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
                  Error 520
                </h1>
                <span className="text-xs sm:text-sm text-neutral-400 font-mono">
                  Ray ID: <span className="text-neutral-300 font-medium">894a73e6f92a18d2</span> • 2026-08-31 07:15:38 UTC
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-neutral-300 mt-2">
                Web server is returning an unknown error / Server Overloaded
              </h2>
            </div>

            {/* Cloudflare 3-Node Architecture Diagram */}
            <div className="relative bg-[#16161d] border border-white/10 rounded-2xl p-6 sm:p-10 mb-10 shadow-2xl">
              <div className="grid grid-cols-5 items-center text-center max-w-3xl mx-auto">
                
                {/* Node 1: Browser */}
                <div className="flex flex-col items-center col-span-1">
                  <div className="relative mb-3">
                    {/* Browser Icon */}
                    <div className="w-16 h-14 sm:w-20 sm:h-16 rounded-lg border-2 border-neutral-600 bg-neutral-900/80 flex flex-col p-1 shadow-md">
                      <div className="flex items-center gap-1 pb-1 border-b border-neutral-700 px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                      </div>
                      <div className="flex-1" />
                    </div>
                    {/* Green check badge */}
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg border-2 border-[#16161d]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">You</span>
                  <span className="text-sm sm:text-base font-semibold text-white">Browser</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 tracking-wide mt-0.5">Working</span>
                </div>

                {/* Left Arrow */}
                <div className="flex items-center justify-center col-span-1 text-neutral-500">
                  <svg className="w-8 sm:w-12 h-6 text-neutral-500" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 12h32M14 6l-6 6 6 6M34 6l6 6-6 6" />
                  </svg>
                </div>

                {/* Node 2: Cloudflare */}
                <div className="flex flex-col items-center col-span-1">
                  <div className="relative mb-3">
                    {/* Cloud Icon */}
                    <div className="w-16 h-14 sm:w-20 sm:h-16 flex items-center justify-center text-neutral-400">
                      <svg className="w-full h-full drop-shadow-md" viewBox="0 0 64 64" fill="none">
                        <path
                          d="M19 46h27a12 12 0 0 0 4-23.3A16 16 0 0 0 20.5 24 10 10 0 0 0 19 46z"
                          fill="#22222d"
                          stroke="#71717a"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Green check badge */}
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg border-2 border-[#16161d]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Abuja Edge</span>
                  <span className="text-sm sm:text-base font-semibold text-white">Cloudflare</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 tracking-wide mt-0.5">Working</span>
                </div>

                {/* Right Arrow */}
                <div className="flex items-center justify-center col-span-1 text-neutral-500">
                  <svg className="w-8 sm:w-12 h-6 text-neutral-500" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 12h32M14 6l-6 6 6 6M34 6l6 6-6 6" />
                  </svg>
                </div>

                {/* Node 3: Host / Origin Server */}
                <div className="flex flex-col items-center col-span-1 relative">
                  <div className="relative mb-3">
                    {/* Server Rack Icon */}
                    <div className="w-16 h-14 sm:w-20 sm:h-16 rounded-lg border-2 border-red-500/60 bg-red-950/20 flex flex-col justify-around p-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      <div className="flex items-center justify-between border-b border-red-500/30 pb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        <div className="w-8 h-1 rounded-full bg-neutral-700" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <div className="w-8 h-1 rounded-full bg-neutral-700" />
                      </div>
                    </div>
                    {/* Red X badge */}
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg border-2 border-[#16161d] animate-bounce">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium truncate max-w-[100px] sm:max-w-none">abuja-cars.com</span>
                  <span className="text-sm sm:text-base font-semibold text-white">Host</span>
                  <span className="text-xs sm:text-sm font-bold text-red-500 tracking-wide mt-0.5">Error</span>

                  {/* Indicator tooltip arrow pointing down */}
                  <div className="absolute -bottom-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white/15" />
                </div>

              </div>
            </div>

            {/* What Happened / What Can I Do - 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10 pb-8 mb-8 text-neutral-300">
              {/* What happened? */}
              <div>
                <h3 className="text-xl sm:text-2xl font-light text-white mb-3">
                  What happened?
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  There is an unknown connection issue between Cloudflare and the origin web server. As a result, the web page cannot be displayed because the origin host is currently overloaded or non-responsive.
                </p>
              </div>

              {/* What can I do? */}
              <div>
                <h3 className="text-xl sm:text-2xl font-light text-white mb-3">
                  What can I do?
                </h3>
                
                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">
                      If you are a visitor of this website:
                    </h4>
                    <p className="text-neutral-400 text-sm">
                      Please try again in a few seconds. The server watchdog is auto-recovering.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">
                      If you are the owner of this website:
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      There is an issue between Cloudflare's cache and your origin server. Cloudflare monitors for these errors and automatically investigates the cause.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Origin Server Crash Log Terminal (Developer Diagnostic) */}
            <div className="bg-[#0c0c10] border border-white/15 rounded-xl shadow-xl overflow-hidden text-left font-mono text-xs leading-relaxed">
              <div className="bg-[#181822] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-green-500/90" />
                  <span className="ml-2 text-white/60 text-[11px] font-mono select-none">
                    Origin Diagnostics • /var/log/nginx/520_error.log
                  </span>
                </div>
                <div className="text-[11px] text-red-400 font-mono font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  HOST_CONNECTION_TIMED_OUT
                </div>
              </div>

              <div className="p-4 font-mono overflow-x-auto space-y-1.5 bg-black/85 max-h-48 overflow-y-auto">
                {displayedLogs.map((log, index) => {
                  let colorClass = 'text-white/80';
                  if (log.type === 'crit') colorClass = 'text-red-400 font-bold';
                  else if (log.type === 'err') colorClass = 'text-red-300';
                  else if (log.type === 'warn') colorClass = 'text-amber-300';
                  else if (log.type === 'code') colorClass = 'text-cyan-300/80';
                  else if (log.type === 'sys') colorClass = 'text-purple-300';
                  else if (log.type === 'action') colorClass = 'text-emerald-400 font-semibold';

                  return (
                    <div key={index} className={`whitespace-pre font-mono ${colorClass}`}>
                      {log.text}
                    </div>
                  );
                })}
                <div className="flex items-center gap-1 text-white/50 pt-1 font-mono">
                  <span className="text-emerald-400">root@origin-host:~$</span>
                  <span className="text-white/80">systemctl status origin-gateway</span>
                  <span className="inline-block w-1.5 h-3.5 bg-white animate-pulse" />
                </div>
              </div>
            </div>

            {/* Cloudflare Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-4">
              <div>
                Cloudflare Ray ID: <span className="text-neutral-300 font-mono">894a73e6f92a18d2</span> • Your IP: <span className="font-mono text-neutral-300">197.210.226.84</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Performance &amp; security by</span>
                <span className="font-semibold text-white tracking-wide">Cloudflare</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
