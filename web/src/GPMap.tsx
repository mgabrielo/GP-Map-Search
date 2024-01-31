import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "dotenv/config";
import styles from "./GPMap.module.css";

// get apiKey from env
const apiKey = process.env.API_KEY as string;

type itemState = {
  name: string;
  select: boolean;
};

// get current location of user
navigator.geolocation.getCurrentPosition(
  async (postion) => {
    const { latitude, longitude } = postion.coords;
    localStorage.setItem("latitude", JSON.stringify(latitude));
    localStorage.setItem("longitude", JSON.stringify(longitude));
  },
  (err) => {
    console.log(err);
  }
);

export default function GPMap() {
  const currentLatitude = localStorage.getItem("latitude");
  const currentLongitude = localStorage.getItem("longitude");
  const [gps, setGps] = useState<any | undefined>([]);
  // initialize user location with current values
  const [userLocation, setUserLocation] = useState({
    lat: Number(currentLatitude),
    lng: Number(currentLongitude),
  });
  const [isItem, setIsItem] = useState<itemState>({
    name: "",
    select: false,
  });
  const [isIcon, setIsIcon] = useState<itemState>({
    name: "",
    select: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // preference to axios to easily catch async errors
        await axios
          .get("http://localhost:3000/gps", {
            params: { lat: userLocation.lat, lng: userLocation.lng },
          })
          .then((res) => {
            setUserLocation({
              lat: Number(currentLatitude),
              lng: Number(currentLongitude),
            });
            setGps(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  const defaultMapParams = {
    center: userLocation,
    zoom: 13,
  };

  const handleIconClick = (value: any) => {
    setIsIcon({ name: value?.name, select: true });
    setIsItem({ ...isIcon, select: false });
  };
  const handleItemClick = (value: any) => {
    setIsItem({ name: value?.name, select: true });
    setIsIcon({ ...isItem, select: false });
  };

  return (
    <>
      <div className={styles.gridStyle}>
        {gps && (
          <div
            style={{
              height: "auto",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GoogleMapReact
              // set apikey for google map react
              bootstrapURLKeys={{ key: apiKey }}
              defaultCenter={defaultMapParams.center}
              defaultZoom={defaultMapParams.zoom}
            >
              {gps &&
                gps.length > 0 &&
                gps.map((gp: any, index: number) => (
                  <GPMapIcon
                    key={index}
                    gp={gp}
                    lat={gp.location.lat}
                    lng={gp.location.lng}
                    text={gp.name}
                    onClick={() => handleItemClick(gp)}
                    isIcon={isIcon}
                    index={index}
                  ></GPMapIcon>
                ))}
            </GoogleMapReact>
          </div>
        )}
        <div className={styles.listView}>
          <h2 className={styles.ListViewHeaderText}>List of Doctors</h2>
          <div className={styles.ListScrollView}>
            {gps &&
              gps?.length &&
              gps.map((item: any, index: any) => {
                if (item) {
                  return (
                    <div
                      className={styles.ListItemView}
                      style={{
                        backgroundColor:
                          isItem.name == item?.name && isItem.select == true
                            ? "red"
                            : "transparent",
                      }}
                      key={index}
                      onClick={() => handleIconClick(item)}
                    >
                      <span>
                        {index + 1}.
                        <p className={styles.ListItemText}>{item?.name}</p>
                      </span>
                      <div className={styles.divider} />
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export const GPMapIcon = ({ gp, text, onClick, isIcon, index }: any) => {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <FontAwesomeIcon
        icon={faUserMd}
        size={isIcon.name == text ? "2x" : "2x"}
        className={styles.mapIcon}
        style={{
          display: "block",
          position: "relative",
          backgroundColor:
            isIcon.name == text && isIcon.select && index >= 0
              ? "cyan"
              : "white",
          padding: isIcon.name == text ? 1 : 3,
        }}
        onClick={onClick}
      ></FontAwesomeIcon>
      <p
        style={{
          display: isIcon.name == text && isIcon.select ? "flex" : "none",
          backgroundColor: "white",
          padding: 5,
          fontSize: 15,
          fontWeight: "bold",
          borderRadius: 10,
        }}
      >
        {text}
      </p>
    </div>
  );
};
