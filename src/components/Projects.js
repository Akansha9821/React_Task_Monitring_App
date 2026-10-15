import React, { useState } from "react";
import "./Projects.css";

const periods = ["Daily", "Weekly", "Monthly", "Yearly"];

const projects = {
  Daily: [
    { id: "daily-planner", name: "Daily Planner", description: "Plan today’s priorities and keep small tasks moving.", progress: 68, tasks: "8 tasks", color: "violet", icon: "✦" },
    { id: "morning-routine", name: "Morning Routine", description: "Build a calmer, more consistent start to the day.", progress: 42, tasks: "5 tasks", color: "orange", icon: "☀" },
    { id: "inbox-zero", name: "Inbox Zero", description: "Triage messages and make room for focused work.", progress: 25, tasks: "4 tasks", color: "blue", icon: "↗" },
  ],
  Weekly: [
    { id: "team-sprint", name: "Team Sprint", description: "Coordinate this week’s deliverables and check-ins.", progress: 56, tasks: "12 tasks", color: "blue", icon: "⌘" },
    { id: "fitness-plan", name: "Fitness Plan", description: "Make time for movement and track your sessions.", progress: 75, tasks: "6 tasks", color: "green", icon: "↗" },
    { id: "home-reset", name: "Home Reset", description: "A simple weekly reset for a more organized space.", progress: 30, tasks: "7 tasks", color: "orange", icon: "⌂" },
  ],
  Monthly: [
    { id: "portfolio-refresh", name: "Portfolio Refresh", description: "Showcase recent work and update your case studies.", progress: 48, tasks: "9 tasks", color: "violet", icon: "▧" },
    { id: "reading-list", name: "Reading List", description: "Make steady progress through this month’s books.", progress: 35, tasks: "5 tasks", color: "green", icon: "▤" },
    { id: "budget-review", name: "Budget Review", description: "Review spending and plan the month ahead.", progress: 82, tasks: "4 tasks", color: "blue", icon: "$" },
  ],
  Yearly: [
    { id: "learn-a-language", name: "Learn a Language", description: "Practice a little each week and build a lasting habit.", progress: 22, tasks: "18 tasks", color: "orange", icon: "文" },
    { id: "career-growth", name: "Career Growth", description: "Set meaningful goals and invest in your next step.", progress: 40, tasks: "11 tasks", color: "violet", icon: "↗" },
    { id: "travel-more", name: "Travel More", description: "Collect ideas, plan trips, and make memories.", progress: 15, tasks: "8 tasks", color: "blue", icon: "✈" },
  ],
};

function Projects() {
  const [period, setPeriod] = useState("Daily");
  const [workspace, setWorkspace] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const visibleProjects = projects[period];

  if (workspace) {
    const taskList = [
      `Set a clear goal for ${workspace.name.toLowerCase()}`,
      "Break the goal into manageable steps",
      "Choose the next action and schedule it",
      "Review progress and adjust the plan",
    ];
    const done = completedTasks[workspace.id] || [];

    return (
      <main className="app-shell">
        <header className="topbar">
          <button className="brand" onClick={() => setWorkspace(null)} aria-label="Go to projects"><span className="brand-mark">P</span> PACE</button>
          <span className="topbar-note">Make progress, one step at a time</span>
          <div className="avatar" aria-label="Your profile">A</div>
        </header>
        <section className="workspace-page">
          <button className="back-link" onClick={() => setWorkspace(null)}>← <span>All projects</span></button>
          <div className="workspace-heading">
            <div className={`project-icon ${workspace.color}`}>{workspace.icon}</div>
            <div><p className="eyebrow">{period} project workspace</p><h1>{workspace.name}</h1><p className="workspace-description">{workspace.description}</p></div>
          </div>
          <div className="workspace-grid">
            <section className="workspace-panel">
              <div className="panel-heading"><div><p className="eyebrow">YOUR PLAN</p><h2>Project tasks</h2></div><span className="task-count">{done.length}/{taskList.length} done</span></div>
              <div className="task-list">{taskList.map((task, index) => {
                const checked = done.includes(index);
                return <label className={`task-row${checked ? " is-done" : ""}`} key={task}><input type="checkbox" checked={checked} onChange={() => setCompletedTasks((current) => ({ ...current, [workspace.id]: checked ? done.filter((item) => item !== index) : [...done, index] }))} /><span className="task-check" aria-hidden="true">✓</span><span>{task}</span></label>;
              })}</div>
            </section>
            <aside className="workspace-panel progress-panel"><p className="eyebrow">PROJECT PROGRESS</p><div className="big-progress">{Math.min(100, workspace.progress + done.length * 8)}<span>%</span></div><div className="progress-track"><span style={{ width: `${Math.min(100, workspace.progress + done.length * 8)}%` }} /></div><p className="muted">Keep taking small steps. Your progress will add up.</p></aside>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#projects"><span className="brand-mark">P</span> PACE</a>
        <span className="topbar-note">Make progress, one step at a time</span>
        <div className="avatar" aria-label="Your profile">A</div>
      </header>
      <section className="dashboard" id="projects">
        <div className="welcome-row"><div><p className="eyebrow">YOUR PROJECT SPACE</p><h1>Good things happen<br className="desktop-break" /> one step at a time.</h1><p className="welcome-copy">Choose a project and make a little progress today.</p></div><div className="welcome-art" aria-hidden="true"><span className="art-sun" /><span className="art-card art-card-back" /><span className="art-card art-card-front"><i /><i /><i /></span><span className="art-sparkle">✳</span></div></div>
        <div className="section-heading"><div><p className="eyebrow">YOUR FOCUS</p><h2>Projects by timeframe</h2></div><span className="project-total">{visibleProjects.length} projects</span></div>
        <nav className="period-tabs" aria-label="Project timeframe">{periods.map((item) => <button key={item} className={`period-tab${period === item ? " selected" : ""}`} onClick={() => setPeriod(item)} aria-pressed={period === item}>{item}</button>)}</nav>
        <div className="project-grid">{visibleProjects.map((project) => <article className="project-card" key={project.id}><div className="card-top"><div className={`project-icon ${project.color}`}>{project.icon}</div><button className="more-button" aria-label={`More options for ${project.name}`}>···</button></div><p className="card-period">{period.toUpperCase()} PROJECT</p><h3>{project.name}</h3><p className="card-description">{project.description}</p><div className="card-progress-label"><span>Progress</span><strong>{project.progress}%</strong></div><div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div><div className="card-bottom"><span className="task-count">{project.tasks}</span><button className="workspace-button" onClick={() => setWorkspace(project)}>Open workspace <span aria-hidden="true">→</span></button></div></article>)}</div>
        <footer className="dashboard-footer">A little progress is still progress <span>✦</span></footer>
      </section>
    </main>
  );
}

export default Projects;
