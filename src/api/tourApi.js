import axios from "axios";

const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;

// const contentTypeToId = {
//     "관광지": 12,
//     "문화시설": 14, 
//     "축제공연행사": 15,
//     "레포츠": 28,
//     "숙박": 32,
//     "쇼핑": 38,
//     "음식점": 39,
// };
 
export const fetchLocationBasedTourData = async (locationX, locationY, contentTypeId, distance) => {
    const url = `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?ServiceKey=${TOUR_API_KEY}&contentTypeId=${contentTypeId}&mapX=${locationX}&mapY=${locationY}&radius=${distance}&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=E&numOfRows=100&pageNo=1&_type=json`;

    try {
        const res = await axios.get(url);
        const items = res.data.response.body.items.item;
        return items;
    } catch(error) {
        console.log(error);
    }
}


export const fetchTourDetailCommon = async (contentId) => {
    const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=${TOUR_API_KEY}&contentTypeId=&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;

    try {
        const res = await axios.get(url);
        const itemDetail = res.data.response.body.items.item[0];
        return itemDetail;
    } catch(error) {
        console.log(error);
    }
}


export const fetchTourDetailImage = async (contentId) => {
    const url = `http://apis.data.go.kr/B551011/KorService1/detailImage1?ServiceKey=${TOUR_API_KEY}&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&imageYN=Y&subImageYN=Y&numOfRows=10&_type=json`;

    try {
        const res = await axios.get(url);
        const items = res.data.response.body.items;
        if (items == "") {
            console.log("No image data available");
            return null;
        } else {
            return items.item;
        }
    } catch(error) {
        console.log(error);
    }
}