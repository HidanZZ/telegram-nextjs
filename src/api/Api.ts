import {

	IUser,

} from "@/utils/types";
import api from "./axios";


export class Api {

	public static async getUser() {
		const response = await api.get<{
			ok: boolean;
			user: IUser;
		}>("/api/user/me");
		return response.data;
	}


}
