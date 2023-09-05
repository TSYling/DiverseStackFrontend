/* eslint-disable react/prop-types */
import  {useEffect} from "react"

export default function LoginComponent(props) {
  // const match = useMatches()
  // const location = useLocation()
  console.log(props);
  useEffect(() => {
    document.title = props.title
  }, [props.title]);
  return (
    <div>login</div>
  )
}
