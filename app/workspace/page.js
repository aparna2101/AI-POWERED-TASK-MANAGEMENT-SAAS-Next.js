"use client";

import { useState } from "react";
import WorkspaceSidebar from "@/components/workspace/WorkspaceSidebar";
import WorkspaceTopbar from "@/components/workspace/WorkspaceTopbar";
import AiCopilotDrawer from "@/components/workspace/AiCopilotDrawer";
import OverviewView from "@/components/workspace/views/OverviewView";
import ProjectsView from "@/components/workspace/views/ProjectsView";
import KanbanView from "@/components/workspace/views/KanbanView";
import AiGeneratorView from "@/components/workspace/views/AiGeneratorView";
import CalendarView from "@/components/workspace/views/CalendarView";
import TeamView from "@/components/workspace/views/TeamView";
import AnalyticsView from "@/components/workspace/views/AnalyticsView";
import SettingsView from "@/components/workspace/views/SettingsView";

import NewTaskModal from "@/components/workspace/modals/NewTaskModal";
import NewProjectModal from "@/components/workspace/modals/NewProjectModal";

import {
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_TEAM,
  INITIAL_BLOCKERS,
  INITIAL_NOTIFICATIONS,
} from "@/lib/workspaceData";
import { playClickSound, playSuccessSound } from "@/lib/sound";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  // Modals state
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);

  // Core Data State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [blockers, setBlockers] = useState(INITIAL_BLOCKERS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // 1. Move task on Kanban
  const handleMoveTask = (taskId, nextCol) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: nextCol } : t))
    );
  };

  // 2. Add single task
  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    setActiveTab("kanban");
  };

  // 3. Add generated tasks from AI Generator
  const handleAddTasksToKanban = (newTasksList) => {
    const formatted = newTasksList.map((t) => ({
      ...t,
      project: "Autonomous AI Copilot Engine",
      column: "todo",
      dueDate: "Next Sprint",
      comments: 0,
      avatar: "AI",
    }));
    setTasks((prev) => [...formatted, ...prev]);
    setActiveTab("kanban");
  };

  // 4. Add new project
  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setActiveTab("projects");
  };

  // 5. Resolve blocker in Analytics
  const handleResolveBlocker = (blockerId) => {
    setBlockers((prev) =>
      prev.map((b) => (b.id === blockerId ? { ...b, resolved: true } : b))
    );
  };

  // 6. Mark notifications as read
  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // 7. Invite team member
  const handleInviteMember = ({ email, role }) => {
    const newMember = {
      id: `USR-0${team.length + 1}`,
      name: email.split("@")[0].replace(".", " "),
      role,
      email,
      avatar: email.slice(0, 2).toUpperCase(),
      status: "Invited",
      workload: 0,
      activeTasks: 0,
      completedTasks: 0,
      badgeColor: "cyan",
    };
    setTeam((prev) => [...prev, newMember]);
  };

  return (
    <div className="min-h-screen bg-[#050b1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. App Sidebar */}
      <WorkspaceSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileSidebarOpen(false);
        }}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        tasksCount={tasks.length}
        projectsCount={projects.length}
      />

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#050b1a]/80 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 bg-[#050b1a] h-full shadow-2xl">
            <WorkspaceSidebar
              isMobile={true}
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileSidebarOpen(false);
              }}
              sidebarCollapsed={false}
              setSidebarCollapsed={() => { }}
              tasksCount={tasks.length}
              projectsCount={projects.length}
            />
          </div>
        </div>
      )}

      {/* 2. Main Application Workspace Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "md:pl-20" : "md:pl-64"
          }`}
      >
        {/* App Topbar */}
        <WorkspaceTopbar
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenCopilot={() => setCopilotOpen(true)}
          onOpenAiGenerator={() => setActiveTab("ai-generator")}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
        />

        {/* Dynamic Workspace Tab Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewView
              projects={projects}
              tasks={tasks}
              team={team}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenNewTaskModal={() => setNewTaskModalOpen(true)}
              onOpenNewProjectModal={() => setNewProjectModalOpen(true)}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsView
              projects={projects}
              onOpenNewProjectModal={() => setNewProjectModalOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "kanban" && (
            <KanbanView
              tasks={tasks}
              onMoveTask={handleMoveTask}
              onOpenNewTaskModal={() => setNewTaskModalOpen(true)}
            />
          )}

          {activeTab === "ai-generator" && (
            <AiGeneratorView
              onAddTasksToKanban={handleAddTasksToKanban}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "calendar" && <CalendarView />}

          {activeTab === "team" && (
            <TeamView team={team} onInviteMember={handleInviteMember} />
          )}

          {activeTab === "analytics" && (
            <AnalyticsView
              blockers={blockers}
              onResolveBlocker={handleResolveBlocker}
            />
          )}

          {activeTab === "settings" && <SettingsView />}
        </main>
      </div>

      {/* 3. Global AI Copilot Slide-Over Drawer */}
      <AiCopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        onApplyTasks={handleAddTasksToKanban}
      />

      {/* 4. Modals */}
      <NewTaskModal
        isOpen={newTaskModalOpen}
        onClose={() => setNewTaskModalOpen(false)}
        onAddTask={handleAddTask}
        projects={projects}
        team={team}
      />

      <NewProjectModal
        isOpen={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
        team={team}
      />
    </div>
  );
}
