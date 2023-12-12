//getting DOM elemets
const roomType = document.getElementsByName("RoomType");
const Guide = document.getElementsByName("Guide");

const SingleRoomNum = document.getElementById("SingleRoomNum");
const DoubleRoomNum = document.getElementById("DoubleRoomNum");
const TripleRoomNum = document.getElementById("TripleRoomNum");

const guideStatus = document.getElementsByName("Guide");
// const WithoutGuide = document.getElementById("Without");

const adults = document.getElementById("adults");
const kids = document.getElementById("kids");
const extraBeds = document.getElementById("extraBeds");

const LocalAdultsInput = document.getElementById("LocalAdults");
const LocalKidsInput = document.getElementById("LocalKids");
const ForeignAdultsInput = document.getElementById("ForeignAdults");
const ForeignKidsInput = document.getElementById("ForeignKids");

//Rooms booking form inputs
const TxtName = document.getElementById("Fname");
const TxtEmail = document.getElementById("Email");
const TxtPhone = document.getElementById("phone");
const CheckIn = document.getElementById("checkInDate");
const Checkout = document.getElementById("checkOutDate");
const extraRequirements = document.getElementById("requirements");


//adventure booking form inputs
const optName = document.getElementById("fullName");
const optDate = document.getElementById("Date");
const optTime = document.getElementsByName("selectTime");

const promoCode = document.getElementById("promocode");

const bookNowBtn = document.getElementById("BookNow");
const adventureBookNowBtn = document.getElementById("AdventureBooknowBtn");
const TotalBookingBtn = document.getElementById("TotalBookingCost");
const loyaltyBtn = document.getElementById("loyalty");

const roomAddToFavouriteBtn = document.getElementById("roomAddFavBtn");
const adventureAddToFavouriteBtn = document.getElementById("adventureAddFavBtn");

const output = document.getElementById("output");
const adventureOutput = document.getElementById("Adventureoutput");
const loyaltyDisplay = document.getElementById("loyaltyPoints");
const loyaltyOutput = document.getElementById("loyaltyOutput");
const loyaltyShow = document.getElementById("loyaltyShow");

const popup = document.getElementById("popup");
const BookNowPopup = document.getElementById("BookNowPopup");
const AdventurePopup = document.getElementById("AdventurePopup");
const Totalpopup = document.getElementById("TotalPopup");
const closeBtn = document.getElementById("closeBtn");
const bookNowCloseBtn = document.getElementById("BookNowCloseBtn");
const AdventureCloseBtn = document.getElementById("AdventureCloseBtn");
const TotalcloseBtn = document.getElementById("TotalCloseBtn");

let SingleRoom;
let DoubleRoom;
let TripleRoom;
let NumOfKids;
let NumOfExtraBeds;

let PromoDiscount;
let loyaltyPointsAvailable;
let loyaltyPoints;
let totalCost;
let OverallCost;
let NumOfLocalAdults;
let NumOfLocalKids;
let NumOfForeignAdults;
let NumOfForeignKIds;
let guide;
let Withguide;
let Withoutguide;
let adventureTime;
let AdventureCost;

let roomFavs = [];
let adventureFavs = [];


const singleRoomPrice = 25000;
const doubleRoomPrice = 35000;
const tripleRoomPrice = 40000;

const extraKids = 5000;

const extraBedPrice = 8000;

const WithguideadultPrice = 1000;
const WithguidekidsPrice = 500;

const LocalAdultPrice = 5000;
const LocalKidsPrice = 2000;
const ForeignAdultsPrice = 10000;
const ForeignKidsPrice = 5000;

initialise();

roomType.forEach((element) =>
    element.addEventListener("change", CheckRoomType)
);
Guide.forEach((element) => element.addEventListener("change", CheckGuide));

kids.addEventListener("change", checkKids);

extraBeds.addEventListener("change", checkExtraBeds);

LocalAdultsInput.addEventListener("change", checkLocalAdults);
LocalKidsInput.addEventListener("change", checkLocalKids);

ForeignAdultsInput.addEventListener("change", checkForeignAdults);
ForeignKidsInput.addEventListener("change", checkForeignKids);

// loyaltyBtn.addEventListener("click", checkLoyalty);

bookNowBtn.addEventListener("click", function (event) {
    calculateTotalCost();
    if (validate()) {
        if (promoCode.value == "Promo123") {
            PromoDiscount = totalCost * (5 / 100);
            totalCost -= PromoDiscount;
        } 

        output.innerText = totalCost;
        console.log(totalCost);

        overlay.style.display = "block";
        BookNowPopup.style.display = "block";

        let bookingDate = document.getElementById("bookingDate");
        bookingDate.innerText = `CheckIn: ${CheckIn.value} CheckOut: ${Checkout.value}`;

        const tableBody = document.querySelector("#dynamicTable tbody");

        console.log("EXTRA " + extraRequirements.value);

        const tableData = [
            { [`single room * ${SingleRoom}`]: "LKR. " +SingleRoom * singleRoomPrice },
            { [`DoubleRoom room * ${DoubleRoom}`]: "LKR. " +DoubleRoom * doubleRoomPrice },
            { [`TripleRoom room * ${TripleRoom}`]: "LKR. " +TripleRoom * tripleRoomPrice },
            { [`Kids * ${NumOfKids}`]: "LKR. " +NumOfKids * extraKids },
            { [`extraBeds * ${NumOfExtraBeds}`]: "LKR. " +NumOfExtraBeds * extraBedPrice },
            { [`Extra Requirements`]: extraRequirements.value},
            { [`Discount Promo`]: "LKR. "  +PromoDiscount },
            { [`Total`]: "LKR. " +totalCost },
        ];

        // Clear existing rows
        tableBody.innerHTML = "";

        // Loop through the data and create rows
        tableData.forEach((dataObject) => {
            for (const key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    const row = document.createElement("tr");

                    // Create cell for header
                    const headerCell = document.createElement("td");
                    headerCell.textContent = key;
                    row.appendChild(headerCell);

                    // Create cell for value
                    const valueCell = document.createElement("td");
                    valueCell.textContent = dataObject[key];
                    row.appendChild(valueCell);

                    // Append the row to the table body
                    tableBody.appendChild(row);
                }
            }
        });

        storeRoomsBooking();
        storeLoyalty();

        roomAddToFavouriteBtn.addEventListener("click", function(event){
            addToFavsRooms();
            
        })

        setTimeout(() => BookNowPopup.classList.add("show"), 50);
    } else {
        return null;
    }
});

//adventure booking button
adventureBookNowBtn.addEventListener("click", function (event) {
    calculateAdventureCost();

    if (adventureValidate()) {
        adventureOutput.innerText = AdventureCost;
        console.log(AdventureCost);
    
        overlay.style.display = "block";
        AdventurePopup.style.display = "block";

        let AdventureDate = document.getElementById("AdventureBookingDate");
        AdventureDate.innerText = `Date: ${optDate.value} Time: ${timeslot()}`;

        let selectedGuide = null;

        for (var i = 0; i < guideStatus.length; i++) {
            if (guideStatus[i].checked) {
                selectedGuide = guideStatus[i].value;
                break;  // Exit the loop once a selected radio button is found
            }
        }

        console.log("GUIDE STATUS: " + selectedGuide);

        const AdventureTableBody = document.querySelector("#AdventureTable tbody");

        const AdventureData = [
            { [`local adults * ${NumOfLocalAdults}`]: "LKR. "+NumOfLocalAdults * LocalAdultPrice },
            { [`local kids * ${NumOfLocalKids}`]: "LKR. "+NumOfLocalKids * LocalKidsPrice },
            { [`foreign adults * ${NumOfForeignAdults}`]: "LKR. "+NumOfForeignAdults * ForeignAdultsPrice},
            { [`local adults * ${NumOfForeignKIds}`]: "LKR. "+NumOfForeignKIds * ForeignKidsPrice},
            { [`Guide Status`]: selectedGuide},
            { [`Total`]: "LKR. " +AdventureCost },

        ];
        AdventureTableBody.innerHTML = "";

        AdventureData.forEach((dataObject) => {
            for (const key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    const row = document.createElement("tr");

                    const headerCell = document.createElement("td");
                    headerCell.textContent = key;
                    row.appendChild(headerCell);

                    const valueCell = document.createElement("td");
                    valueCell.textContent = dataObject[key];
                    row.appendChild(valueCell);

                        
                    AdventureTableBody.appendChild(row);
                }
            }
        });

        storeAdventureBooking(selectedGuide);

        adventureAddToFavouriteBtn.addEventListener("click", function(event){
            addToFavsAdventure(selectedGuide);
            
        })

        setTimeout(() => AdventurePopup.classList.add("show"), 50);
    } else {
        return null;
    }
});

TotalBookingBtn.addEventListener("click", function (event) {
    overallCost();
    if (validate()) {

        console.log("ROOMS VALIDATED")
        if (promoCode.value == "Promo123") {
            PromoDiscount = totalCost * (5 / 100);
            totalCost -= PromoDiscount;
        } else{
            if(adventureValidate()){
                console.log("ADVENTURE VALIDATED")
            }
        }

        let selectedGuide = null;

        for (var i = 0; i < guideStatus.length; i++) {
            if (guideStatus[i].checked) {
                selectedGuide = guideStatus[i].value;
                break;  // Exit the loop once a selected radio button is found
            }
        }

    

        overlay.style.display = "block";
        Totalpopup.style.display = "block";

        const tableBody = document.querySelector("#TotalTable tbody");

        console.log("TOTAL")
        console.log(`single room * ${SingleRoom}`+ "LKR. " +SingleRoom * singleRoomPrice)
        console.log(`DoubleRoom room * ${DoubleRoom}`+ "LKR. " +DoubleRoom * doubleRoomPrice)
        console.log(`Total`+ "LKR. " +OverallCost)

        const TotalTable = [
            { [`single room * ${SingleRoom}`]: "LKR. " +SingleRoom * singleRoomPrice },
            { [`DoubleRoom room * ${DoubleRoom}`]: "LKR. " +DoubleRoom * doubleRoomPrice },
            { [`TripleRoom room * ${TripleRoom}`]: "LKR. " +TripleRoom * tripleRoomPrice },
            { [`Kids * ${NumOfKids}`]: "LKR. " +NumOfKids * extraKids },
            { [`extraBeds * ${NumOfExtraBeds}`]: "LKR. " +NumOfExtraBeds * extraBedPrice },
            { [`Extra Requirements`]: extraRequirements.value},
            { [`Discount Promo`]: "LKR. "  +PromoDiscount },
            { [`local adults * ${NumOfLocalAdults}`]: "LKR. "+NumOfLocalAdults * LocalAdultPrice },
            { [`local kids * ${NumOfLocalKids}`]: "LKR. "+NumOfLocalKids * LocalKidsPrice },
            { [`foreign adults * ${NumOfForeignAdults}`]: "LKR. "+NumOfForeignAdults * ForeignAdultsPrice},
            { [`local adults * ${NumOfForeignKIds}`]: "LKR. "+NumOfForeignKIds * ForeignKidsPrice},
            { [`Guide Status`]: selectedGuide},
            { [`Total`]: "LKR. " +OverallCost },

        ];

        tableBody.innerHTML = "";

        // Loop through the data and create rows
        TotalTable.forEach((dataObject) => {
            for (const key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    const row = document.createElement("tr");

                    // Create cell for header
                    const headerCell = document.createElement("td");
                    headerCell.textContent = key;
                    row.appendChild(headerCell);

                    // Create cell for value
                    const valueCell = document.createElement("td");
                    valueCell.textContent = dataObject[key];
                    row.appendChild(valueCell);

                    // Append the row to the table body
                    tableBody.appendChild(row);
                }
            }
        })
        setTimeout(() => Totalpopup.classList.add("show"), 50);
    } else {
        console.log("Error Validating total cost")
        return null;
    }
});

loyaltyBtn.addEventListener("click", function () {
    loyalty = checkLoyalty();
    console.log("L: " + loyalty.loyaltyPoints);

    overlay.style.display = "block";
    popup.style.display = "block";
    const loyaltyPointsData = `Loyalty Points ${loyalty.loyaltyPoints}</br>Loyalty Points Available ${loyalty.loyaltyPointsAvailable}`;
    

    const loyaltyPointsParagraph = document.getElementById("loyaltyData");

    // Check if the element is found before setting its content
    if (loyaltyPointsParagraph) {
        loyaltyPointsParagraph.innerHTML = loyaltyPointsData;
    }

    setTimeout(() => popup.classList.add("show"), 50);
});


// Event listener for the close button
closeBtn.addEventListener("click", function () {
    overlay.style.display = "none";
    popup.style.display = "none";
    popup.classList.remove("show");
});

bookNowCloseBtn.addEventListener("click", function () {
    overlay.style.display = "none";
    BookNowPopup.style.display = "none";
    BookNowPopup.classList.remove("show");
});

AdventureCloseBtn.addEventListener("click", function (){
    overlay.style.display = "none";
    AdventurePopup.style.display = "none";
    AdventurePopup.classlist.remove("show");
});

TotalcloseBtn.addEventListener("click", function (){
    overlay.style.display = "none";
    Totalpopup.style.display = "none";
    Totalpopup.classlist.remove("show");
});


function initialise() {
    SingleRoom = 0;
    DoubleRoom = 0;
    TripleRoom = 0;

    guide = false;

    NumOfLocalAdults = 0;
    NumOfLocalKids = 0;
    NumOfForeignAdults = 0;
    NumOfForeignKIds = 0;
    adventureTime = "";

    NumOfKids = 0;
    NumOfExtraBeds = 0;
    PromoDiscount = 0;
    loyaltyPointsAvailable = JSON.parse(localStorage.getItem("loyalty"));

    if (loyaltyPointsAvailable == null) {
        loyaltyPointsAvailable = 0;
    }

    showLoyalty();
    loyaltyPoints = 0;

    totalCost = 0;
    AdventureCost = 0;
}
//calculating the total rooms booking cost
function calculateTotalCost() {
    totalCost =
        SingleRoom * singleRoomPrice +
        DoubleRoom * doubleRoomPrice +
        TripleRoom * tripleRoomPrice +
        NumOfKids * extraKids +
        NumOfExtraBeds * extraBedPrice;
    //    console.log(totalCost);
    output.innerText = totalCost;
}

//calculating the total adventure booking cost
function calculateAdventureCost() {
    if (guide) {
        AdventureCost =
            NumOfLocalAdults * (5000 + 1000) +
            NumOfLocalKids * (2000 + 500) +
            NumOfForeignAdults * (10000 + 1000) +
            NumOfForeignKIds * (5000 + 500);
    } else {
        AdventureCost =
            NumOfLocalAdults * LocalAdultPrice +
            NumOfLocalKids * LocalKidsPrice +
            NumOfForeignAdults * ForeignAdultsPrice +
            NumOfForeignKIds * ForeignKidsPrice;
    }
    adventureOutput.innerText = AdventureCost;
}
function overallCost() {
    OverallCost = totalCost + AdventureCost;
    
}

function CheckRoomType() {
    if (this.value == "SingleRoom") {
        if (this.checked) {
            SingleRoomNum.addEventListener("change", () => {
                SingleRoom = parseInt(SingleRoomNum.value);
                //  console.log("room num: " + SingleRoom)
                calculateTotalCost();
            });
        } else {
            SingleRoomNum.value = 0;
            SingleRoom = 0;
            calculateTotalCost();
        }
    } else if (this.value == "DoubleRoom") {
        if (this.checked) {
            DoubleRoomNum.addEventListener("change", () => {
                DoubleRoom = parseInt(DoubleRoomNum.value);
                // console.log("room num: " + DoubleRoom)
                calculateTotalCost();
            });
        } else {
            DoubleRoomNum.value = 0;
            DoubleRoom = 0;
            calculateTotalCost();
        }
    } else if (this.value == "TripleRoom") {
        if (this.checked) {
            TripleRoomNum.addEventListener("change", () => {
                TripleRoom = parseInt(TripleRoomNum.value);
                // console.log("room num: " + TripleRoom)
                calculateTotalCost();
            });
        } else {
            TripleRoomNum.value = 0;
            TripleRoom = 0;
            calculateTotalCost();
        }
    }
}

function checkKids() {
    NumOfKids = parseInt(kids.value);
    calculateTotalCost();
}

function checkExtraBeds() {
    NumOfExtraBeds = parseInt(this.value);
    calculateTotalCost();
}

function CheckGuide() {
    if (this.value == "WithGuide") {
        if (this.checked) {
            guide = true;
        }
    } else {
        guide = false;
    }
}

function checkLocalAdults() {
    NumOfLocalAdults = parseInt(LocalAdultsInput.value);
    calculateAdventureCost();
}

function checkLocalKids() {
    NumOfLocalKids = parseInt(LocalKidsInput.value);
    calculateAdventureCost();
}

function checkForeignAdults() {
    NumOfForeignAdults = parseInt(ForeignAdultsInput.value);
    calculateAdventureCost();
}

function checkForeignKids() {
    NumOfForeignKIds = parseInt(ForeignKidsInput.value);
    calculateAdventureCost();
}

function showLoyalty() {
    loyaltyDisplay.innerText = loyaltyPointsAvailable;
}

function checkLoyalty() {
    let numOfRooms = SingleRoom + DoubleRoom + TripleRoom;
    console.log(loyaltyPointsAvailable);

    // Check if loyaltyShow is defined before setting innerText
    if (loyaltyShow) {
        if (numOfRooms > 3) {
            loyaltyPoints = numOfRooms * 20;
            loyaltyShow.innerText = loyaltyPoints;
        } else {
            loyaltyShow.innerText = 0;
        }
    }

    // Check if loyaltyDisplay is defined before setting innerText
    if (loyaltyDisplay) {
        loyaltyDisplay.innerText = loyaltyPointsAvailable;
    }

    return {
        loyaltyPoints: loyaltyPoints,
        loyaltyPointsAvailable: loyaltyPointsAvailable,
    };
}

function storeLoyalty() {
    let numOfRooms = SingleRoom + DoubleRoom + TripleRoom;
    if (numOfRooms > 3) {
        loyaltyPoints = numOfRooms * 20;
        localStorage.setItem(
            "loyalty",
            JSON.stringify(loyaltyPointsAvailable + loyaltyPoints)
        );
    }
}

function storeRoomsBooking() {
    const BookingInfo = {
        UserName: TxtName.value,
        UserEmail: TxtEmail.value,
        UserPhone: TxtPhone.value,
        singleRooms: SingleRoomNum.value,
        doubleRooms: DoubleRoomNum.value,
        tripleRooms: TripleRoomNum.value,
        adults: adults.value,
        kids: kids.value,
        checkInDates: CheckIn.value,
        checkOutDates: Checkout.value,
        Requirements: extraRequirements.value,
        extraBeds: extraBeds.value,
    };
    localStorage.setItem("BookingInfo", JSON.stringify(BookingInfo));
}
function storeAdventureBooking(selectedGuide) {
    const AdventureBookingInfo = {
        AdventureUserName: optName.value,
        AdventureUserDate: optDate.value,
        InputLocalAdults: LocalAdultsInput.value,
        InputLOcalKids: LocalKidsInput.value,
        InputForeignAdults: ForeignAdultsInput.value,
        InputForeignKids: ForeignKidsInput.value,
        GuideStatus: selectedGuide,
        
    };
    localStorage.setItem("AdventureBookingInfo", JSON.stringify(AdventureBookingInfo));

}

function addToFavsRooms() {
    const BookingInfo = {
        UserName: TxtName.value,
        UserEmail: TxtEmail.value,
        UserPhone: TxtPhone.value,
        singleRooms: SingleRoomNum.value,
        doubleRooms: DoubleRoomNum.value,
        tripleRooms: TripleRoomNum.value,
        adults: adults.value,
        kids: kids.value,
        checkInDates: CheckIn.value,
        checkOutDates: Checkout.value,
        Requirements: extraRequirements.value,
        extraBeds: extraBeds.value,
    };

    roomFavs.push(BookingInfo)
    localStorage.setItem("RoomFavorites", JSON.stringify(roomFavs));
}
function addToFavsAdventure(selectedGuide) {
    const AdventureBookingInfo = {
        AdventureUserName: optName.value,
        AdventureUserDate: optDate.value,
        InputLocalAdults: LocalAdultsInput.value,
        InputLOcalKids: LocalKidsInput.value,
        InputForeignAdults: ForeignAdultsInput.value,
        InputForeignKids: ForeignKidsInput.value,
        GuideStatus: selectedGuide,
        
    };
    adventureFavs.push(AdventureBookingInfo)
    localStorage.setItem("AdevntureFavorites", JSON.stringify(adventureFavs))
}


//validation for rooms booking form
function validate() {
    let isValid = false;

    let userName = TxtName.value;
    let userEmail = TxtEmail.value;
    let userNumber = TxtPhone.value;
    let userCheckInDate = CheckIn.value;
    let userCheckOutDate = Checkout.value;
    let NumOfadults = adults.value;

    if (!userName) {
        window.alert("please enter your name");
    } else if (!userEmail) {
        window.alert("please enter your email");
    } else if (!userNumber) {
        window.alert("plese enter your phone number");
    } else if (!userCheckInDate) {
        window.alert("plese enter check-in date");
    } else if (!userCheckOutDate) {
        window.alert("plese enter check-out date");
    } else if (!NumOfadults) {
        window.alert("plese enter NUmber of Adults");
    } else {
        isValid = true;
        console.log("Booking successful");
    }
    return isValid;
}
//validation for adventure booking form
function adventureValidate() {
    let isAdventureValid = false;

    let InputUserName = optName.value;
    let InputDate = optDate.value;

    if (!InputUserName) {
        window.alert("please enter your name");
    } else if (!InputDate) {
        window.alert("please enter date");
    } else {
        isAdventureValid = true;
        console.log("booking successful");
    }
    return isAdventureValid;
}
//selecting adventure time slot
function timeslot() {
    let selectedTime = null;

    optTime.forEach((item) => {
        if (item.checked) {
            selectedTime = item.value;
        }
    });
    return selectedTime;
}




