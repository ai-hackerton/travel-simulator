import { database } from "../../firebase-config";
import { ref, set } from "firebase/database";

export const setData = async (data, path) => {
    // path: realtime database path (e.g. `tourapi/${contentId}/outline` => tourapi-[contentId]-outline의 value로 저장)

    try {
        await set(ref(database, path), data);
        console.log("Upload successful");
    } catch(error) {
        console.log("Upload failed");
        console.log(error);
    }
}

export const getUserList = async (path) => {
    // 
}

export const getTourOutline = async (path) => {
    // 
}