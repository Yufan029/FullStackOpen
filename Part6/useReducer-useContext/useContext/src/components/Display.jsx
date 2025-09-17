import { useCounterValue } from "../helper"

const Display = () => {
  return (
    <div>
      {useCounterValue()}
    </div>
  )
}

export default Display