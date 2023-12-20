import {useQuery } from "react-query";

const useQueryHook = (properties) => {
    return useQuery(properties)
}

export default useQueryHook