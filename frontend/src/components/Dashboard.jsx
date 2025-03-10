import Topbar from "./Topbar";
import { GiMeditation } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { FcMindMap } from "react-icons/fc";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen">
        <Topbar />
        <div className="stats flex flex-col">
          {/* Mood Check-ins */}
          <div className="stat">
            <div className="stat-figure text-primary">
            <FaCalendarCheck size={34}/>
            </div>
            <div className="stat-title">Mood Check-ins</div>
            <div className="stat-value text-primary">15</div>
            <div className="stat-desc">This month</div>
          </div>

          {/* Meditation Minutes */}
          <div className="stat">
            <div className="stat-figure text-secondary">
            <GiMeditation size={36}/>
            </div>
            <div className="stat-title">Meditation Minutes</div>
            <div className="stat-value text-secondary">120</div>
            <div className="stat-desc">This week</div>
          </div>

          {/* Stress Level */}
          <div className="stat">
            <div className="stat-figure text-accent">
                <FcMindMap size={36} className="text-accent fill-accent"/>
            </div>
            <div className="stat-title">Stress Level</div>
            <div className="stat-value">Low</div>
            <div className="stat-desc text-accent">Keep up the good work!</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
