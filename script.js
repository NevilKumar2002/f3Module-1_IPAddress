let firstContainer= document.getElementById("first-container");
let secondContainer = document.getElementById("second-container");
let button = document.getElementById("button");
let POCard= document.getElementById("PO-card");
let timeZone=document.getElementById("time-zone");
let dateTime=document.getElementById("date-time");
let Pincode= document.getElementById("pincode");
let PINCount= document.getElementById("NoofPo");
let lat1=document.getElementById("lat");
let long1=document.getElementById("long")
let secondContainer1= document.getElementById("second-conatiner-1")
let search= document.getElementById("search-input");
let PO_arr=[];
function convertMonths(Month) {
  let a = Month.toString().length;
  if (a == 1) {
    return "0" + Month;
  } else {
    return Month;
  }
}
function convertDate(Date) {
  let b = Date.toString();
  if (b < 10) {
    return "0" + Date;
  } else {
    return Date;
  }
}


let textContent = document.getElementById("ip-address");
$.getJSON("https://api.ipify.org?format=json", function (data) {
  console.log(data.ip);
  // Setting text of element P with id gfg
  textContent.innerText = `Your Current IP Address is ${data.ip}`;
  $("ip-address").html(data.ip);
  document.cookie=`id= ${data.ip}`
 
});





async function displayMap() {
let IP=document.cookie.split("=")[1];
firstContainer.style.display="none";
  secondContainer.style.display = "block";
//   const url = "https://ipinfo.io/160.238.75.17/geo"
try{
  const url=`https://ipapi.co/${IP}/json/`
  const response = await fetch(url);
  const result =  await response.json();
  console.log(result);
  const div=document.createElement("div");
  // div.className="s"
  div.innerHTML=` <p id="IP_add"><b>IP Address :</b> ${result.ip}</p>
  <p id="lat"><b>Lat:</b>${result.latitude}</p>
  <p id="long"><b>Long:</b>${result.longitude}</p>
  <p id="city"><b>City:</b>${result.city}</p>
  <p id="region"><b>Region:</b>${result.region}</p>
  <p id="org"><b>Organisation:</b>${result.org}</p>
  <p id="host"><b>Host Name:</b>${result.asn}</p>`

  secondContainer1.append(div);
    const lat = result.latitude;
    const long = result.longitude;
    const cityName=result.city;
    const pincode=result.postal;
    const TimeZone= result.timezone;
    timezonefn(TimeZone);
    postal(pincode);
    console.log(lat,long)
    timeZone.innerHTML=`<p><b>Time Zone:</b>${result.timezone}</p>`;
    Pincode.innerHTML=`<p><b>Pincode:</b>${result.postal}</p>`
    
    // const accuracy= pos.coords.accuracy;
    // console.log(pos);
    displayMap2(lat, long,cityName);
}
catch(error)
{
  console.log("Some error Occured")
}

  }
  
function timezonefn(TimeZone)
{
  let user_dateTime = new Date().toLocaleString("en-US", { timeZone: `${TimeZone}` });
  console.log(user_dateTime)
  let date1= new Date(user_dateTime);
console.log(date1)
// console.log(date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+(date1.getDay()+1));
const latestDate =date1.getFullYear() +"-" + convertMonths(date1.getMonth() + 1) + "-" +convertDate(date1.getDate());
const latestTime= date1.getHours()+":"+date1.getMinutes()+":"+date1.getSeconds();
console.log(latestTime)  ;
dateTime.innerHTML=`<p><b>Date And Time:</b>${latestDate} ${latestTime}</p>`;

}


function displayMap2(latitude, longitude,cityName) {
  var map = L.map("map").setView([latitude, longitude], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker([latitude, longitude]).addTo(map);
  var circle = L.circle([latitude, longitude], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 50,
  }).addTo(map);
  marker.bindPopup(`Welcome to ${cityName}`).openPopup();
  circle.bindPopup("I am a circle.");
}
// Map()
button.addEventListener("click", displayMap);

async function postal(pincode){
    try{
      const endpoint=`https://api.postalpincode.in/pincode/${pincode}`;
    const response= await fetch(endpoint);
    const result= await  response.json();
    console.log(result[0])
   let postofficelength=result[0].PostOffice.length;
   PINCount.innerHTML=`<p><b>Message: Number of pincode(s) found:</b>${postofficelength}</p>`
    for(let i=0 ;i<postofficelength;i++)
    {

      PO_arr.push(result[0].PostOffice[i]);
        // console.log(result[0].PostOffice[i])
        const div= document.createElement("div");
        div.className="card-container";
        div.innerHTML=`<p><b>Name:</b>${result[0].PostOffice[i].Name}</p>
        <p><b>Branch Type:</b>${result[0].PostOffice[i].BranchType}</p>
        <p><b>Delivery Status:</b>${result[0].PostOffice[i].DeliveryStatus}</p>
        <p><b>District:</b>${result[0].PostOffice[i].District}</p>
        <p><b>Division:</b>${result[0].PostOffice[i].Division}</p>`
        POCard.append(div)
        filteredPO()
    }
    }
    catch(error)
    {
      console.log("some Error Occured in Fetching Post Offices")
    }
}
console.log(PO_arr);


function filteredPO(){
  let searchInput= search.value;
  for(let i=0 ;i<PO_arr.length;i++)
  {
    console.log(searchInput)
  }


}
