import  { FC, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { Loader2 } from "lucide-react"

interface RewardModalProps {

}

const RewardModal: FC<RewardModalProps> = () => {
    const [openModal, setOpenModal] = useState(false)
    const [buttonState, setButtonState] = useState<string>("idle");

    const buttonCopy:{
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
            <button onClick={() => { setOpenModal(prev => !prev) }} className='bg-white py-1 px-3 rounded-full font-bold cursor-pointer text-brand'>
                Claim
            </button>
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

export default RewardModal;