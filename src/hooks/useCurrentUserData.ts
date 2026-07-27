import {useQuery} from "@tanstack/react-query";
import {getUser} from "../services/api.ts";

export const useCurrentUserData = () => {
    return useQuery(
        {
            queryKey: ["user"],
            queryFn: () => {
                return getUser();
            },
            retry: 1,
        }
    )
}