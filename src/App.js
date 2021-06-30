import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import senator from "./assets/img/senator-material.jpeg";
import ankara from "./assets/img/ankara-material.jpeg";
import cap from "./assets/img/cap-material.jpeg";
import "./App.css";

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
      </header>
      <main className="content-wrapper">
        <div className="toast flex-vertical">
          <h3 className="headings">Toast</h3>
          <p>
            And one of His signs is that He created mates for you from yourselves that you
            may find rest in them, and He put between you love and compassion; most surely
            there are signs in this for a people who reflect. <p>-Q30:21</p>
          </p>
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

          <Tabs className={`modal ${clicked ? "" : "hidden"}`}>
            <span className="close-btn" onClick={closeAttendModal}>
              &#10005;
            </span>
            <TabList>
              <Tab>Physical</Tab>
              <Tab>Virtual</Tab>
            </TabList>

            <TabPanel>
              <h4 className="location">FIDIMAYE EVENTS AND SUITES (SALVADOR HALL)</h4>
              <p className="address">
                44-48 Olayiwola Street, new oko oba road Abule Egba, Lagos
              </p>
              <p className="direction-copy">
                From Agege/oshodi take a bus going to Sango or Abule Egba, alight at
                Abule-Egba bus-stop. Take marwa going to puposhola and alight at Salvador
                hall opposite OTAK filling station. You can also take bike from Abule Egba
                bus-stop to SALVADOR HALL directly.
              </p>
            </TabPanel>
            <TabPanel>
              <iframe
                title="zoom registration"
                src="https://zoom.us/meeting/register/78757cd4b823a69es7c24e00bf0acfdd2b8"
                width="100%"
                height="100%"
              ></iframe>
            </TabPanel>
          </Tabs>
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
          <p>Wether Ankara or Senator material, contact the number below.</p>
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
