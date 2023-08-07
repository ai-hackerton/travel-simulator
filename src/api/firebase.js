import { database } from "../../firebase-config";
import { ref, set, push, get } from "firebase/database";

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

// 중복 확인 + 이름 등록
export const registerName = async (name) => {
    try {
        var duplicateName = await nameExists(name);
        if (!duplicateName) {
            await set(push(ref(database, "/users")), name);
            console.log("Upload successful");
            return true;
        } else {
            console.log("Existing name");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

// 이름 중복 확인
export const nameExists = async (name) => {
    try {
        const snapshot = await get(ref(database, "/users"));
        const userNames = snapshot.val();
        return Object.values(userNames).includes(name);
    } catch (error) {
        console.log(error);
        return null;
    }
}

// 시뮬레이션 기록 파베에 업로드
export const uploadRecord = async (name, record) => {
    setData(record, "/records/" + name);
}

// 이름으로 시뮬레이션 기록 불러오기
export const getUserRecord = async (name) => {
    try {
        const record = await get(ref(database, "/records/" + name));
        return record;
    } catch (error) {
        console.log(error);
        return null;
    }
}