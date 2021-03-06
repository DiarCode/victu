import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

import { IUserData } from "../../types/types";

import Cookies from "universal-cookie";

const useFetchUserData = () => {
  const cookies = new Cookies();
  const usersDataCollectionRef = collection(db, "usersDataCollection");
  const [data, setData] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const localUserAuth = cookies.get("userAuthData");
    const uid = localUserAuth.uid;

    async function getData() {
      try {
        const queryData = query(
          usersDataCollectionRef,
          where("uid", "==", uid)
        );

        const snapshot = await getDocs(queryData);
        const docs = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))[0] as IUserData;

        setData(docs);

        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
};

export default useFetchUserData;
