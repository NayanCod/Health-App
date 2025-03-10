import React, { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "./Topbar";
import { GiMeditation } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { FcMindMap } from "react-icons/fc";

const Dashboard = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/mood`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMoods(Array.isArray(res.data.moods) ? res.data.moods : []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch moods");
        setLoading(false);
      }
    };

    fetchMoods();
  }, [token]);

  useEffect(() => {
    const checkMoodForToday = () => {
      const today = new Date().toISOString().split("T")[0];
      if (moods.length === 0) {
        setShowModal(true);
        return;
      }
      const hasMoodForToday = Array.isArray(moods) && moods.some(
        (mood) => new Date(mood.timestamp).toISOString().split("T")[0] === today
      );
      if (!hasMoodForToday) {
        setShowModal(true);
      }
    };

    const timer = setTimeout(checkMoodForToday, 10000);

    return () => clearTimeout(timer);
  }, [moods]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitMood = async (event) => {
    event.preventDefault();
    const mood = event.target.mood.value;
    const description = event.target.description.value;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/mood`,
        { mood, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      // Fetch moods again to update the list
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/mood`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMoods(Array.isArray(res.data.moods) ? res.data.moods : []);
    } catch (error) {
      console.error("Failed to submit mood", error);
    }
  };

  return (
    <>
      <div className="h-screen">
        <Topbar />
        <div className="stats flex flex-col">
          {/* Mood Check-ins */}
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaCalendarCheck size={34} />
            </div>
            <div className="stat-title">Mood Check-ins</div>
            <div className="stat-value text-primary">15</div>
            <div className="stat-desc">This month</div>
          </div>

          {/* Meditation Minutes */}
          <div className="stat">
            <div className="stat-figure text-secondary">
              <GiMeditation size={36} />
            </div>
            <div className="stat-title">Meditation Minutes</div>
            <div className="stat-value text-secondary">120</div>
            <div className="stat-desc">This week</div>
          </div>

          {/* Stress Level */}
          <div className="stat">
            <div className="stat-figure text-accent">
              <FcMindMap size={36} className="text-accent fill-accent" />
            </div>
            <div className="stat-title">Stress Level</div>
            <div className="stat-value">Low</div>
            <div className="stat-desc text-accent">Keep up the good work!</div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-semibold px-5">Recent Moods</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : moods.length === 0 ? (
            <p className="px-4">No moods found</p>
          ) : (
            <div className="carousel w-full">
              {moods.map((mood, index) => (
                <div
                  key={mood._id}
                  id={`slide${index + 1}`}
                  className="carousel-item relative w-full"
                >
                  <div className="w-full py-4 px-8">
                    <div className="stat">
                      <div className="stat-figure text-primary">
                        <FaCalendarCheck size={34} />
                      </div>
                      <div className="stat-title">
                        On {new Date(mood.timestamp).toLocaleDateString()}
                      </div>
                      <div className="stat-value text-success">{mood.mood}</div>
                    </div>
                  </div>
                  <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a
                      href={`#slide${index === 0 ? moods.length : index}`}
                      className="btn btn-circle"
                    >
                      ❮
                    </a>
                    <a
                      href={`#slide${index === moods.length - 1 ? 1 : index + 2}`}
                      className="btn btn-circle"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Your Mood</h3>
            <form onSubmit={handleSubmitMood}>
              <div className="form-control">
                <label className="label" htmlFor="mood">
                  Mood
                </label>
                <input
                  type="text"
                  id="mood"
                  name="mood"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-bordered"
                ></textarea>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;