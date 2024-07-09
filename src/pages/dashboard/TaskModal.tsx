import { FC, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { Loader2 } from "lucide-react"
import { toast } from 'sonner';
import axios from 'axios';

interface TaskModalProps {
  task: any
  isCompleted: any
}

const TaskModal: FC<TaskModalProps> = ({ task, isCompleted }) => {
  const [openModal, setOpenModal] = useState(false)
  const [buttonState, setButtonState] = useState<string>("idle");

  console.log(isCompleted, 'isCompleted');

  const handleTask = async () => {

    if (isCompleted) {
      return;
    }
    if (task?.type === 'static') {
      const url = 'https://x.com/iamhumanxyz'
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? window.open(url, "_top") : window.open(url, "_blank")
      updateTwitterTask()
      toast.success('Task Completed')
      return
    }


    const req: any = await UpdateReclaimTask()
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? window.open(req.requestUrl, "_top") : window.open(req.requestUrl, "_blank")

  }

  const UpdateReclaimTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No JWT token found in local storage.');
      return;
    }

    let data = {
      "taskId": task.id
    };

    let config = {
      method: 'post',
      url: 'https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/task/generate',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch rewards')
    }
  }

  const updateTwitterTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No JWT token found in local storage.');
      return;
    }

    let data = {
      "taskId": task.id
    };

    let config = {
      method: 'post',
      url: 'https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/task/update',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log(response.data, 'response.data');
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
    }

  }





  const buttonCopy: {
    idle: string,
    loading: JSX.Element,
    success: string,
    [key: string]: string | JSX.Element,
  } = {
    idle: "Claim Your Nft",
    loading: <Loader2 className="h-6 w-6 animate-spin" />,
    success: "Nft Claimed",
  };

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpenModal(false));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [openModal]);

  return (
    <>
      <div onClick={() => { handleTask() }} className='bg-white p-3 rounded-3xl flex justify-between items-center font-bold cursor-pointer text-brand'>
        <div className="flex gap-2 items-center">
          <div className=" bg-brand rounded-xl h-[54px] w-[54px]  "></div>
          <p className=' text-[#333342] w-[15ch]  ' >{task?.description}</p>
        </div>
        {
          isCompleted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.8501 12.0001C1.8501 6.39441 6.39441 1.8501 12.0001 1.8501C17.6058 1.8501 22.1501 6.39441 22.1501 12.0001C22.1501 17.6058 17.6058 22.1501 12.0001 22.1501C6.39441 22.1501 1.8501 17.6058 1.8501 12.0001ZM16.0639 10.672C16.52 10.3606 16.6373 9.73836 16.3258 9.28227C16.0144 8.82618 15.3922 8.70892 14.9361 9.02036L14.8348 9.08953C13.1939 10.21 11.7795 11.6244 10.6609 13.2575L9.20673 11.8049C8.816 11.4146 8.18283 11.4149 7.79252 11.8056C7.4022 12.1964 7.40254 12.8295 7.79327 13.2198L10.1345 15.5585C10.3549 15.7787 10.6653 15.8836 10.974 15.8422C11.2828 15.8008 11.5546 15.6179 11.7093 15.3475C12.7601 13.5099 14.2145 11.9349 15.9626 10.7412L16.0639 10.672Z" fill="#08AC3D" />
            </svg>
          ) : (
            <p>{task.expPoints} XP </p>
          )
        }


      </div>
      <AnimatePresence>
        {openModal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className=" absolute inset-0 z-40  pointer-none bg-brand/85 w-full h-full "
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {
          openModal ? (
            <div className=" fixed inset-0 grid place-items-center z-50">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                ref={ref} className=" h-fit w-[320px] bg-white border-2 border-[#9EA8FD] rounded-3xl px-[10px]  py-3 ">
                <div className="w-full relative h-[300px] overflow-hidden rounded-2xl bg-brand">
                  <motion.img
                    initial={{ x: -30 }}
                    animate={{ x: 0, transition: { delay: 0.1 } }}
                    exit={{ x: 30 }}
                    className='absolute'
                    src="/humanhuman.svg" alt="" />

                  <motion.img
                    initial={{ y: 30 }}
                    animate={{ y: 0, transition: { delay: 0.1 } }}
                    exit={{ y: 30 }}
                    className=' absolute'
                    src="/david.png" alt="" />

                </div>
                <h2 className=' text-2xl font-bold text-black mt-4 ' >
                  Lorem ipsum dolor sit amet
                </h2>
                <p className=' text-brand mt-2 text-xs ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                <button className=' mt-4 overflow-hidden py-[14px] bg-brand text-white font-semibold w-full rounded-2xl '
                  disabled={buttonState === "loading"}
                  onClick={() => {
                    if (buttonState === "success") return;

                    setButtonState("loading");

                    setTimeout(() => {
                      setButtonState("success");
                    }, 1750);

                    setTimeout(() => {
                      setButtonState("idle");
                    }, 3500);
                  }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                      initial={{ opacity: 0, y: -25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      key={buttonState}
                      className='flex justify-center items-center gap-2 w-full'
                    >
                      {buttonCopy[buttonState]}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </motion.div>
            </div>
          ) : null
        }
      </AnimatePresence>
    </>
  )
}

export default TaskModal;