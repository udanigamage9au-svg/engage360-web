import DashboardLayout from "./DashboardLayout"
import BusTracker from "../components/BusTracker"

function Transit(){

return(

<DashboardLayout
activePage="transit"
title="Transit & Navigation"
subtitle="Track your campus shuttle in real time."
>

<BusTracker />

</DashboardLayout>

)

}

export default Transit