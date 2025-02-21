import { Button } from '@/components/ui/button';
import { MessagesSquare } from 'lucide-react';

const SendMessage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-2 h-full'>
        <MessagesSquare size={90} strokeWidth={1}/>
        <h2 className='text-xl'>Your messages</h2>
        <p>Send a message to start a chat.</p>
        <Button className='font-semibold m-1'>Send message</Button>
    </div>
  )
}

export default SendMessage