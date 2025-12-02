import React, { useMemo } from 'react';

function Timeline({ events, startDate, nextVisitDate }) {
    const today = useMemo(() => new Date(), []);
    
    // --- PART 1: RELATIONSHIP METRICS (The "Our Shared Universe" Date Finder) ---
    const calculateMetrics = () => {
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const findMilestone = (days) => {
            const milestoneDate = new Date(startDate.getTime());
            milestoneDate.setDate(startDate.getDate() + days);
            return milestoneDate;
        };

        const milestones = [500, 1000, 1500, 2000].map(days => ({
            days,
            date: findMilestone(days),
        }));

        let nextMilestone = milestones.find(m => m.date > today);
        if (!nextMilestone) {
            const next1000DayMark = Math.ceil(diffDays / 1000) * 1000;
            nextMilestone = { days: next1000DayMark, date: findMilestone(next1000DayMark) };
        }

        const daysUntilNext = Math.ceil(Math.abs(nextMilestone.date - today) / (1000 * 60 * 60 * 24));

        return { diffDays, nextMilestone, daysUntilNext };
    };

    const { diffDays, nextMilestone, daysUntilNext } = useMemo(() => calculateMetrics(), [startDate, today]);

    // --- PART 2: TIMELINE VISUALIZATION LOGIC ---
    const sortedEvents = useMemo(() => 
        [...events].sort((a, b) => a.date - b.date)
    , [events]);

    return (
        <section id="timeline-projection">
            <h2>Our Shared Universe 🚀</h2>
            
            <div className="metrics-box">
                <p className="metric-primary">We have been together for <span className="text-glow">{diffDays}</span> days!</p>
                <p className="metric-secondary">Our next big milestone is the <span className="text-glow">{nextMilestone.days}th day</span> on {nextMilestone.date.toDateString()}.</p>
                <p className="metric-secondary">That's only <span className="text-glow">{daysUntilNext}</span> days away!</p>
            </div>

            <div className="timeline-visual">
                <h3>The Path So Far</h3>
                {sortedEvents.map((event, index) => {
                    const isPassed = event.date < today;
                    const isNextVisit = event.date.getTime() === nextVisitDate.getTime();
                    
                    return (
                        <div key={index} className={`timeline-item ${isPassed ? 'passed' : ''} ${isNextVisit ? 'next-visit' : ''}`}>
                            <div className="dot"></div>
                            <div className="content">
                                <h4>{event.title} ({event.date.toLocaleDateString()})</h4>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx="true">{`
                .metrics-box { background-color: rgba(138, 43, 226, 0.2); border: 1px solid var(--secondary-color); border-radius: 10px; padding: 20px; margin-bottom: 30px; text-align: center; }
                .metric-primary { font-size: 1.5em; font-weight: 700; }
                .metric-secondary { font-size: 1em; margin: 5px 0; color: #ccc; }
                .timeline-visual { position: relative; padding-left: 50px; border-left: 2px solid var(--primary-color); }
                .timeline-item { position: relative; margin-bottom: 30px; padding-bottom: 20px; }
                .dot { width: 14px; height: 14px; background-color: var(--secondary-color); border-radius: 50%; position: absolute; left: -57px; top: 10px; border: 3px solid var(--bg-dark); box-shadow: 0 0 10px rgba(138, 43, 226, 0.7); }
                .timeline-item.passed { opacity: 0.6; }
                .timeline-item.next-visit .dot { background-color: #50c878; box-shadow: 0 0 20px #50c878; transform: scale(1.3); }
                .content h4 { margin-top: 0; margin-bottom: 5px; font-size: 1.2em; color: var(--primary-color); }
            `}</style>
        </section>
    );
}

export default Timeline;