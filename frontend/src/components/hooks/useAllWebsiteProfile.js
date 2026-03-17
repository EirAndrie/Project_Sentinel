import { useState, useEffect } from "react";
import api from "../../lib/axios.js";

const useAllWebsiteProfile = (userID) => {
  const [websiteProfiles, setWebsiteProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsiteProfiles = async () => {
      if (!userID) {
          setLoading(false);
          return;
      }
      try {
        setLoading(true);
        const response = await api.get(`/get-websites-by-user/${userID}`);
        if(response.data.success) {
            setWebsiteProfiles(response.data.websites);
        } else {
            setWebsiteProfiles([]);
        }
      } catch (error) {
        setError(error);
        setWebsiteProfiles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWebsiteProfiles();
  }, [userID]);

  return { websiteProfiles, loading, error };
};

export default useAllWebsiteProfile;
