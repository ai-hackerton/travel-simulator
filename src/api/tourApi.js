import useSimulationHistory from "@/app/store/simulationHistory";
import axios from "axios";

const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;


 
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

export const getFilteredList = (placeList, contentTypeId, category) => {

    // 강원특별자치도 areacode: 32
    var placeList = placeList.filter(place => place.areacode == 32);

    // const sigungucode = {
    //     강릉시: 1,
    //     고성군: 2,
    //     동해시: 3,
    //     삼척시: 4,
    //     속초시: 5,
    //     양구군: 6,
    //     양양군: 7,
    //     영월군: 8,
    //     원주시: 9,
    //     인제군: 10,
    //     정선군: 11,
    //     철원군: 12,
    //     춘천시: 13,
    //     태백시: 14,
    //     평창군: 15,
    //     홍천군: 16,
    //     화천군: 17,
    //     횡성군: 18
    // };

    // const categoryList = {
    //     12: ["전체", "자연", "역사", "휴양", "체험", "산업", "건축/조형물"],    //관광지
    //     14: ["전체", "박물관", "기념관", "전시관", "미술관/화랑", "공연장", "문화원", "도서관/대형서점", "문화전수시설", "영화관"], //문화시설
    //     28: ["전체", "육상 레포츠", "수상 레포츠", "항공 레포츠", "복합 레포츠"],   //레포츠
    //     32: ["전체", "관광호텔", "콘도미니엄", "유스호스텔", "펜션", "모텔", "민박", "게스트하우스", "홈스테이", "한옥"],   //숙박
    //     39: ["전체", "한식", "서양식", "일식", "중식", "이색음식점", "카페/전통찻집"]   //음식점
    // }

    switch (contentTypeId) {
        case 12:    //관광지
            switch (category) {
                case "전체":
                    return placeList;
                case "자연":
                    return placeList.filter(place => place.cat1 == "A01")
                case "역사":
                    return placeList.filter(place => place.cat2 == "A0201")
                case "휴양":
                    return placeList.filter(place => place.cat2 == "A0202")
                case "체험":
                    return placeList.filter(place => place.cat2 == "A0203")
                case "산업":
                    return placeList.filter(place => place.cat2 == "A0204")
                case "건축/조형물":
                    return placeList.filter(place => place.cat2 == "A0205")
            }
        case 14:    //문화시설
            switch (category) {
                case "전체":
                    return placeList;
                case "박물관":
                    return placeList.filter(place => place.cat3 == "A02060100")
                case "기념관":
                    return placeList.filter(place => place.cat3 == "A02060200")
                case "전시관":
                    return placeList.filter(place => place.cat3 == "A02060300")
                case "미술관/화랑":
                    return placeList.filter(place => place.cat3 == "A02060500")
                case "공연장":
                    return placeList.filter(place => place.cat3 == "A02060600")
                case "문화원":
                    return placeList.filter(place => place.cat3 == "A02060700")
                case "도서관/대형서점":
                    return placeList.filter(place => place.cat3 == "A02060900" || place.cat3 == "A02061000")
                case "문화전수시설":
                    return placeList.filter(place => place.cat3 == "A02061100")
                case "영화관":
                    return placeList.filter(place => place.cat3 == "A02061200")
            }
        case 28:    //레포츠
            switch (category) {
                case "전체":
                    return placeList;
                case "육상레포츠":
                    return placeList.filter(place => place.cat2 == "A0302")
                case "수상레포츠":
                    return placeList.filter(place => place.cat2 == "A0303" || place.cat3 == "A03010200")
                case "항공레포츠":
                    return placeList.filter(place => place.cat2 == "A0304" || place.cat3 == "A03010300")
                case "복합레포츠":
                    return placeList.filter(place => place.cat2 == "A0305")
            }
        case 32:    //숙박
            switch (category) {
                case "전체":
                    return placeList;
                case "관광호텔":
                    return placeList.filter(place => place.cat3 == "B02010100")
                case "콘도미니엄":
                    return placeList.filter(place => place.cat3 == "B02010500")
                case "유스호스텔":
                    return placeList.filter(place => place.cat3 == "B02010600")
                case "펜션":
                    return placeList.filter(place => place.cat3 == "B02010700")
                case "모텔":
                    return placeList.filter(place => place.cat3 == "B02010900")
                case "민박":
                    return placeList.filter(place => place.cat3 == "B02011000")
                case "게스트하우스":
                    return placeList.filter(place => place.cat3 == "B02011100")
                case "홈스테이":
                    return placeList.filter(place => place.cat3 == "B02011200")
                case "한옥":
                    return placeList.filter(place => place.cat3 == "B02011600")
            }
        case 39:    //음식점
            switch (category) {
                case "전체":
                    return placeList;
                case "한식":
                    return placeList.filter(place => place.cat3 == "A05020100")
                case "서양식":
                    return placeList.filter(place => place.cat3 == "A05020200")
                case "일식":
                    return placeList.filter(place => place.cat3 == "A05020300")
                case "중식":
                    return placeList.filter(place => place.cat3 == "A05020400")
                case "이색음식점":
                    return placeList.filter(place => place.cat3 == "A05020700")
                case "카페/전통찻집":
                    return placeList.filter(place => place.cat3 == "A05020900")
            }
    }
}
