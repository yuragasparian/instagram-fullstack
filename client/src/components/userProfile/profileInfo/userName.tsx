import { Button } from "@/components/ui/button"
import { useUserContext } from "../userProfileContext"


const UserName = () => {
    const {user} = useUserContext()
  return (
    <div className="flex gap-4">
        <span className="font-semibold text-2xl">{user?.username}</span>
        <Button className="font-semibold" >Follow</Button>
        <Button variant={"secondary"} className="font-semibold">Message</Button>
      </div>
  )
}

export default UserName