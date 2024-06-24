import React, { FC } from 'react'

interface TaskModalProps {
  
}

const TaskModal: FC<TaskModalProps> = ({  }) => {
  return (
    <div className='w-full bg-white rounded-3xl text-black p-3 flex justify-between items-center '>
     <div className=" flex gap-2 justify-start items-center">
        <div className=" bg-brand h-12 w-12 rounded-xl "></div>
        <p>
        Create Proof for swiggy
        </p>
     </div>
     <p>^</p>
    </div>
  )
}

export default TaskModal;