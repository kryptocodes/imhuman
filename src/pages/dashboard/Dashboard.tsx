import DashboardLayout from "@/components/layouts/DashboardLayout";
import TaskModal from "./TaskModal";
import RewardModal from "./RewardModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const user: any = useUser();

  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [copyText, setCopyText] = useState("Copy Code");

  useEffect(() => {
    // fetch tasks
    fetchTasks();
    // fetch rewards
    fetchRewards();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No JWT token found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        "https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/task",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      toast("Failed to fetch tasks");
    }
  };

  const fetchRewards = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No JWT token found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        "https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/reward",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRewards(response.data);
    } catch (error) {}
  };

  const isTaskCompleted = (taskId: string) => {
    return (
      user?.tasks.filter(
        (task: any) => task.taskId === taskId && task.completedAt !== null
      ).length > 0
    );
  };

  if (!user) {
    <SplashScreen />;
  }

  const rewardStatus = (reward: any) => {
    if (
      user?.RewardsClaim?.filter((r: any) => r.rewardId === reward?.id).length >
      0
    ) {
      return "Claimed";
    } else if (user?.xp < reward?.expPoints) {
      return "progress";
    } else if (user?.xp >= reward?.expPoints) {
      return "Claim";
    }
  };

  useEffect(() => {
    // Cleanup timeout to prevent memory leak
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  let timeoutId: NodeJS.Timeout;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(user?.referralCode)
        .then(() => {
          setCopyText("Copied");
          timeoutId = setTimeout(() => {
            setCopyText("Copy Code");
          }, 2000);
        })
        .catch(() => {
          toast.error("Could not copy text");
        });
    } else {
      toast.error("Clipboard not supported");
    }
  };

  const renderRewardButton = (reward: any) => {
    switch (rewardStatus(reward)) {
      case "Claimed":
        return (
          <button className="text-lg text-brand font-bold bg-white/80 rounded-full px-3 py-1">
            Claimed
          </button>
        );
      case "progress":
        return (
          <span className=" text-lg py-1 px-3 font-bold text-brand bg-white rounded-full ">
            {user?.xp} / {reward.expPoints} xp
          </span>
        );
      case "Claim":
        return <RewardModal reward={reward} />;

      default:
        return (
          <button className="text-xs text-white bg-brand rounded-xl px-3 py-1">
            Claim
          </button>
        );
    }
  };

  if (!user || !tasks || !rewards) return <SplashScreen />;

  return (
    <DashboardLayout>
      <div className=" bg-white/15 border border-white rounded-xl p-3  ">
        <p className=" text-sm">Your Referral Code</p>
        <div className="flex justify-between items-center mt-2 ">
          <p className=" text-2xl font-bold "> {user?.referralCode} </p>
          <button
            className=" text-xs flex items-center gap-2"
            onClick={handleCopy}
          >
            {" "}
            {copyText}{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_224_737)">
                <path
                  d="M8.66671 13.3333C9.55044 13.3323 10.3977 12.9807 11.0226 12.3559C11.6475 11.731 11.999 10.8837 12 10V4.162C12.0011 3.81157 11.9325 3.46442 11.7984 3.14068C11.6643 2.81693 11.4673 2.52302 11.2187 2.276L9.72404 0.78133C9.47701 0.532779 9.18311 0.335732 8.85936 0.20161C8.53561 0.067488 8.18847 -0.00104056 7.83804 -3.66573e-06H4.66671C3.78298 0.00105491 2.93575 0.352584 2.31085 0.977476C1.68596 1.60237 1.33443 2.4496 1.33337 3.33333V10C1.33443 10.8837 1.68596 11.731 2.31085 12.3559C2.93575 12.9807 3.78298 13.3323 4.66671 13.3333H8.66671ZM2.66671 10V3.33333C2.66671 2.8029 2.87742 2.29419 3.25249 1.91912C3.62757 1.54404 4.13627 1.33333 4.66671 1.33333C4.66671 1.33333 7.94604 1.34266 8.00004 1.34933V2.66666C8.00004 3.02028 8.14052 3.35942 8.39056 3.60947C8.64061 3.85952 8.97975 4 9.33337 4H10.6507C10.6574 4.054 10.6667 10 10.6667 10C10.6667 10.5304 10.456 11.0391 10.0809 11.4142C9.70585 11.7893 9.19714 12 8.66671 12H4.66671C4.13627 12 3.62757 11.7893 3.25249 11.4142C2.87742 11.0391 2.66671 10.5304 2.66671 10ZM14.6667 5.33333V12.6667C14.6656 13.5504 14.3141 14.3976 13.6892 15.0225C13.0643 15.6474 12.2171 15.9989 11.3334 16H5.33337C5.15656 16 4.98699 15.9298 4.86197 15.8047C4.73695 15.6797 4.66671 15.5101 4.66671 15.3333C4.66671 15.1565 4.73695 14.9869 4.86197 14.8619C4.98699 14.7369 5.15656 14.6667 5.33337 14.6667H11.3334C11.8638 14.6667 12.3725 14.4559 12.7476 14.0809C13.1227 13.7058 13.3334 13.1971 13.3334 12.6667V5.33333C13.3334 5.15652 13.4036 4.98695 13.5286 4.86193C13.6537 4.7369 13.8232 4.66666 14 4.66666C14.1769 4.66666 14.3464 4.7369 14.4714 4.86193C14.5965 4.98695 14.6667 5.15652 14.6667 5.33333Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_224_737">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="flex gap-2 justify-center items-center mt-3">
          <button
            onClick={() => navigate("/referral-dashboard")}
            className="flex-1 bg-white flex justify-center items-center gap-1 hover:bg-white/80 transition-all duration-200 text-brand rounded-xl py-2 font-semibold text-xs"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_236_428)">
                <path
                  d="M13.1667 14H3.83333C1.99533 14 0.5 12.5047 0.5 10.6667V10.052C0.5 9.684 0.798667 9.38533 1.16667 9.38533C1.18267 9.38533 1.202 9.386 1.22133 9.38733C1.95867 9.37333 2.55467 8.76867 2.55467 8.02733C2.55467 7.286 1.95867 6.68067 1.22133 6.66667C1.202 6.668 1.18267 6.66867 1.16733 6.66867C0.799333 6.66867 0.500667 6.37 0.500667 6.002V5.33267C0.5 3.49533 1.99533 2 3.83333 2H13.1667C15.0047 2 16.5 3.49533 16.5 5.33333V6C16.5 6.368 16.2013 6.66667 15.8333 6.66667C15.098 6.66667 14.5 7.26467 14.5 8C14.5 8.73533 15.098 9.33333 15.8333 9.33333C16.2013 9.33333 16.5 9.632 16.5 10V10.6667C16.5 12.5047 15.0047 14 13.1667 14Z"
                  fill="#001AFF"
                />
              </g>
              <defs>
                <clipPath id="clip0_236_428">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Referral Dashboard
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="flex-1 flex justify-center items-center gap-2 bg-white hover:bg-white/80 transition-all duration-200 text-brand rounded-xl py-2 font-semibold text-xs"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_224_742)">
                <path
                  d="M10.5607 10.665C14.9413 10.643 16.5 8.323 16.5 6.33367C16.5 5.21567 15.708 4.28033 14.6567 4.05433C14.7473 3.797 14.826 3.56033 14.8787 3.381C15.114 2.58567 14.962 1.74567 14.4613 1.07567C13.9507 0.392999 13.17 0.000999451 12.3187 0.000999451H4.68067C3.82933 0.000999451 3.048 0.392999 2.53733 1.07567C2.03667 1.74567 1.88467 2.58633 2.12 3.381C2.17333 3.56033 2.25133 3.797 2.34267 4.055C1.29133 4.281 0.5 5.21633 0.5 6.33433C0.5 8.32367 2.05933 10.6437 6.43933 10.6657C6.47667 10.867 6.5 11.0723 6.5 11.2817V13.3343C6.5 14.5517 5.476 14.6623 5.16667 14.6677H4.5C4.13133 14.6677 3.83333 14.9657 3.83333 15.3343C3.83333 15.703 4.13133 16.001 4.5 16.001H12.5C12.8687 16.001 13.1667 15.703 13.1667 15.3343C13.1667 14.9657 12.8687 14.6677 12.5 14.6677H11.8387C11.524 14.6623 10.5 14.5517 10.5 13.3343V11.281C10.5 11.0723 10.5233 10.867 10.5607 10.6657V10.665ZM14.1347 5.327C14.146 5.327 14.1553 5.33367 14.1667 5.33367C14.718 5.33367 15.1667 5.78233 15.1667 6.33367C15.1667 7.68967 14.094 9.13167 11.1427 9.31367C11.29 9.11433 11.4587 8.92967 11.6507 8.76633C12.81 7.781 13.606 6.46433 14.1347 5.327ZM1.83333 6.33367C1.83333 5.78233 2.282 5.33367 2.83333 5.33367C2.84467 5.33367 2.854 5.32767 2.86467 5.327C3.394 6.46433 4.19 7.781 5.34933 8.76633C5.54133 8.92967 5.71 9.11367 5.85733 9.31367C2.906 9.13167 1.83333 7.68967 1.83333 6.33367ZM7.028 6.509C6.852 6.38767 6.778 6.16367 6.848 5.961L7.194 4.89033L6.28333 4.22367C6.06533 4.06367 6.018 3.75767 6.178 3.53967C6.27 3.41433 6.41667 3.33967 6.572 3.33967H7.69267L8.03333 2.27767C8.11933 2.01967 8.398 1.881 8.656 1.967C8.80267 2.01567 8.918 2.131 8.96667 2.27767L9.30667 3.33967H10.4273C10.6973 3.33967 10.9167 3.55833 10.9167 3.829C10.9167 3.98567 10.842 4.13233 10.716 4.22433L9.80533 4.891L10.1513 5.96167C10.234 6.219 10.0927 6.495 9.83467 6.57833C9.68533 6.62633 9.522 6.59967 9.39533 6.507L8.5 5.84833L7.604 6.50633C7.43333 6.63367 7.2 6.63433 7.028 6.509Z"
                  fill="#001AFF"
                />
              </g>
              <defs>
                <clipPath id="clip0_224_742">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Leaderboard
          </button>
        </div>
      </div>
      <div className=" mt-6">
        <h1 className=" text-3xl font-bold">
          Complete Tasks to <span className="text-white/25">Re</span>Claim your
          Rewards
        </h1>
        <p className="text-xs text-white/60 mt-2">
          Prove your humanity by completing these tasks below
        </p>
        <div className="flex flex-col gap-4 mt-4 ">
          {tasks.map((task: any) => (
            <TaskModal task={task} isCompleted={isTaskCompleted(task.id)} />
          ))}
        </div>

        {rewards.map((reward: any, i) => (
          <div className=" mt-6 border-2 shadow-md rounded-3xl grid grid-cols-3 ">
            <div
              className={` col-span-2 p-3 flex flex-col justify-center items-start ${
                i === 0 ? "order-1" : "order-2"
              }  `}
            >
              <p className=" text-lg font-semibold mb-4 ">
                {/* Complete tasks to <br />  claim the <u>Human Detector</u> NFT */}
                {reward.description}
              </p>
              {renderRewardButton(reward)}
              {/* <RewardModal /> */}
            </div>
            {}
            <img
              src={`${i === 0 ? "/human.svg" : "/reclaim.svg"}`}
              className={`${i === 0 ? "order-2" : "order-1"}`}
              alt=""
            />
          </div>
        ))}

        {/* <div className=" mt-6 border-2 shadow-md rounded-3xl grid grid-cols-3 ">
          <div className=" col-span-2 p-3 flex flex-col justify-center  ">
            <p className=' text-lg font-semibold mb-4 ' >
              Complete tasks to <br />  claim the <u>Human Detector</u> NFT
            </p>
            <RewardModal reward={null} />
          </div>
          <img src="/human.svg" alt="" />
        </div> */}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
