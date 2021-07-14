import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import senator from "./assets/img/senator-material.jpeg";
import ankara from "./assets/img/ankara-material.jpeg";
import cap from "./assets/img/cap-material.jpeg";
import "./App.css";
import axios from "axios";

function App() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`08/07/${year}`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [clicked, setClicked] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [phonenumber, setPhonnumber] = useState("");
  const [attendOption, setAttentOption] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  const [hideForm, setHideForm] = useState(false);

  const openAttendModal = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setOverlay(true);
    setClicked(true);
  };
  const closeAttendModal = () => {
    setOverlay(false);
    setClicked(false);
  };
  const openAccountModal = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setOverlay(true);
    setClicked2(true);
  };
  const closeAccountModal = () => {
    setOverlay(false);
    setClicked2(false);
  };
  const register = async (e) => {
    setRegisterStatus(true);
    e.preventDefault();

    const data = {
      email: useremail,
      name: username,
      phone: phonenumber,
      attendance: attendOption,
    };
    try {
      axios
        .post("https://shura-nikkah-app.herokuapp.com/api/register", data)
        .then((response) => {
          setRegisterStatus(false);
          if (response.status === 200) {
            setHideForm(true);
          }
        });
    } catch (error) {
      console.log(error);
      setRegisterStatus(false);
    }
  };

  const radioOut = (e) => {
    setAttentOption(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setUseremail(e.target.value);
  };
  const handlePhoneNo = (e) => {
    setPhonnumber(e.target.value);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="App">
      <div
        className={`overlay ${overlay ? "" : "hidden"}`}
        onClick={() => {
          closeAttendModal();
          closeAccountModal();
        }}
      ></div>
      <header className="header">
        <p>welcome to</p>
        <h1>shura'21</h1>
        <p className="header__info">
          Nikah (Solemnization) between<br></br>
          <span className="bold-text">
            Shukurah Ajoke Balogun<br></br> &<br></br> Abdur-Rasheed Abiodun Adeoye
          </span>
        </p>
        <p className="opaque-info">7th August 2021 | FIDIMEYIN Hall, Abule-Egba | 11am</p>
      </header>
      <main className="content-wrapper">
        <div className="toast flex-vertical">
          <h3 className="headings">Toast</h3>
          <p>
            And one of His signs is that He created mates for you from yourselves that you
            may find rest in them, and He put between you love and compassion; most surely
            there are signs in this for a people who reflect.
          </p>
          <p>-Q30:21</p>
        </div>
        <div className="attend-box flex-vertical">
          <div>
            <h3 className="headings">Attend</h3>
            <p>THE EVENT</p>
          </div>
          <p>
            You can either choose to attend the event physically or via an online
            platform.
          </p>
          <button className="cta-btn" onClick={openAttendModal}>
            Attend
          </button>

          <div className={`modal ${clicked ? "registration-container" : "hidden"} `}>
            <span className="close-btn" onClick={closeAttendModal}>
              &#10005;
            </span>
            <form
              className={`registration-form ${hideForm ? "hidden" : ""} `}
              onSubmit={register}
            >
              <label htmlFor="username">
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  placeholder="John Doe"
                  onChange={handleUsername}
                  onBlur={handleUsername}
                />
              </label>
              <label htmlFor="useremail">
                <input
                  required
                  type="email"
                  name="useremail"
                  id="useremail"
                  value={useremail}
                  placeholder="youremail@gmail.com"
                  onChange={handleEmail}
                  onBlur={handleEmail}
                />
              </label>
              <label htmlFor="phone-number">
                <input
                  required
                  type="number"
                  name="phone-number"
                  id="phone-number"
                  value={phonenumber}
                  placeholder="+2348123456789"
                  onChange={handlePhoneNo}
                  onBlur={handlePhoneNo}
                />
              </label>
              <div className="attend-choice" value={attendOption} onChange={radioOut}>
                <label htmlFor="physical">
                  <input
                    required
                    type="radio"
                    id="physical"
                    name="attend-choice"
                    value="physical"
                  />
                  Physical
                </label>

                <label htmlFor="virtual">
                  <input
                    required
                    type="radio"
                    id="virtual"
                    name="attend-choice"
                    value="virtual"
                  />
                  Virtual
                </label>
              </div>
              <div>
                <button className="cta-btn" onClick={register}>
                  {registerStatus ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
            {hideForm && (
              <div className="success-message">
                <svg
                  width="70"
                  height="78"
                  viewBox="0 0 70 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50.4738 27.5695C49.8975 26.0311 65.8092 11.8224 56.5317 0.308878C54.3608 -2.38208 46.9942 13.2003 36.5337 20.2549C30.7618 24.1462 17.333 32.4314 17.333 37.0116V66.6598C17.333 72.1674 38.6267 78 54.8071 78C60.7393 78 69.3322 40.8379 69.3322 34.936C69.3322 29.0081 51.0415 29.1121 50.4738 27.5695ZM12.9998 27.9811C10.1485 27.9811 0 29.7144 0 41.5139V62.5216C0 74.3124 10.1485 75.6124 12.9998 75.6124C15.8467 75.6124 8.66652 73.1337 8.66652 65.8192V38.2033C8.66652 30.5421 15.8467 27.9811 12.9998 27.9811Z"
                    fill="black"
                  />
                </svg>
                <h2 className="heading">Thank you!</h2>
                <b>for registering.</b>
                <p>
                  Further details have been sent to the email address you provided above.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="fabric-box flex-vertical">
          <h3 className="headings">Choose Fabric</h3>
          <div className="fabrics">
            <div className="fabric-item">
              <img src={senator} alt="senator material" />
              <div className="material-info">
                <p>
                  <b>Material:</b> Senator
                </p>
                <p>
                  <b>Price:</b> 6,000
                </p>
              </div>
            </div>
            <div className="fabric-item">
              <img src={ankara} alt="tea" />
              <div className="material-info">
                <p>
                  <b>Material:</b> Ankara
                </p>
                <p>
                  <b>Price:</b> 2,500
                </p>
              </div>
            </div>
            <div className="fabric-item">
              <img src={cap} alt="tea" />
              <div className="material-info">
                <p>
                  <b>Material:</b> Cap
                </p>
                <p>
                  <b>Price:</b> 1,000
                </p>
              </div>
            </div>
          </div>
          <p>For Ankara or Materials, contact the number below</p>
          <a
            href="https://wa.me/2348188750328"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn mg-top-1"
          >
            +2348188750328
          </a>
        </div>
        <div className="gift-couple">
          <h3 className="headings">Gift in Cash</h3>

          <p>Endow the couples by gifting them in cash.</p>
          <button className="cta-btn" onClick={openAccountModal}>
            Send money
          </button>
          <div className={`modal ${clicked2 ? "" : "hidden"}`}>
            <span className="close-btn" onClick={closeAccountModal}>
              &#10005;
            </span>
            <div className="account-details">
              <p className="detail-item">
                Account No.: <b>2093900971</b>
              </p>
              <p className="detail-item">
                Account Name.: <b>Abdur-Rasheed Adeoye</b>
              </p>
              <p className="detail-item">
                Bank: <b>UBA</b>
              </p>
            </div>
          </div>
        </div>
        <div className="countdown-timer">
          <h3 className="headings">The Count down</h3>
          <div className="timer">
            <div className="timer-pie">
              <VictoryPie
                padAngle={0}
                data={[
                  { x: " ", y: timeLeft.days },
                  { x: " ", y: 100 - timeLeft.days },
                ]}
                innerRadius={100}
                colorScale={["#ee4e00", "#ffff2b"]}
                animate={{ duration: 2000 }}
              />

              <div className="timer-details">
                <h4 className="figures">{timeLeft.days > 0 ? timeLeft.days : 0}</h4>
                <p className="text">{timeLeft.days > 1 ? ` days` : ` day`}</p>
              </div>
            </div>
            <div className="timer-pie">
              <VictoryPie
                padAngle={0}
                data={[
                  { x: " ", y: timeLeft.hours },
                  { x: " ", y: 100 - timeLeft.hours },
                ]}
                innerRadius={95}
                colorScale={["#ee4e00", "#ffff2b"]}
                animate={{ duration: 2000 }}
              />

              <div className="timer-details">
                <h4 className="figures">{timeLeft.hours > 0 ? timeLeft.hours : 0}</h4>
                <p className="text">{timeLeft.hours > 1 ? ` hours` : ` hour`}</p>
              </div>
            </div>
            <div className="timer-pie">
              <VictoryPie
                padAngle={0}
                data={[
                  { x: " ", y: timeLeft.minutes },
                  { x: " ", y: 100 - timeLeft.minutes },
                ]}
                innerRadius={95}
                colorScale={["#ee4e00", "#ffff2b"]}
                animate={{ duration: 2000 }}
              />

              <div className="timer-details">
                <h4 className="figures">{timeLeft.minutes > 0 ? timeLeft.minutes : 0}</h4>
                <p className="text">{timeLeft.minutes > 1 ? ` mins` : ` min`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="cta-box">
          <button className="cta-btn" onClick={openAttendModal}>
            Attend
          </button>
        </div>
      </main>
      <footer className="footer">
        <p>Copyright Shura'2021</p>
      </footer>
    </div>
  );
}

export default App;
