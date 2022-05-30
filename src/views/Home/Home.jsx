import Container from "../../UI_Helpers/customFlexContainer";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { spendMeCategories } from "../../store/localData";
import backgroundImage2 from "../../Assets/images/bannerImage2.jpg";

import "./Home.css";

export default function Home() {
  const [currentMonthDetails, setCurrentMonthDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nothingSpentYet, setNothingSpentYet] = useState(false);
  const [addSpendMe, setAddSpendMe] = useState(false);

  const currentSpendMeItem = useRef(null);
  const currentSpendMeAmount = useRef(null);

  const token = useSelector((state) => state.userToken);
  const userId = useSelector((state) => state.userId);
  const userName = useSelector((state) => state.userName);
  const yearlySum = useSelector((state) => state.yearlySum);
  const monthlyDetails = useSelector((state) => state.yearlySum);

  //TODO
  //another use effect that requests yearly
  useEffect(() => {
    const apiMonthlyDetails = async () => {
      setIsLoading(true);
      let year = new Date().getFullYear();
      let month = 1 + new Date().getMonth();
      const monthlyDetails = await axios.get(
        `http://localhost:5000/month/detailsByMonth/${year}/${month}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentMonthDetails(monthlyDetails.data);
      setIsLoading(false);
      if (monthlyDetails.data.length === 0) {
        setNothingSpentYet(true);
      } else {
        //dispatch to the store so it will have all the detals in its own function
        //so i can use it also from other api end points, no reason to send multiple requests
      }
    };

    try {
      apiMonthlyDetails();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addSpendMeHandler = (currentSpendMe) => {
    setAddSpendMe(!addSpendMe);
    currentSpendMeItem.current = currentSpendMe;
  };

  const spendMeToDbHandler = async () => {
    console.log(currentSpendMeAmount.current.value);
    setIsLoading(true);
    let year = new Date().getFullYear();
    let month = 1 + new Date().getMonth();

    const addNewAndUpdateUi = await axios.post(
      `http://localhost:5000/month/item/${year}/${month}/${userId}/${currentSpendMeItem.current}/${currentSpendMeAmount.current.value}`,
      {
        amount: currentSpendMeAmount.current.value,
        month,
        year,
        createdBy: userId,
        category: currentSpendMeItem.current,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCurrentMonthDetails(addNewAndUpdateUi.data);

    console.log(addNewAndUpdateUi.data);
    setIsLoading(false);
    //api post
  };

  return (
    <Container
      justify="flex-start"
      paddingLeft="5%"
      alignItems="start"
      height="100vh"
      backgroundImage={backgroundImage2}
    >
      <div className="horizFlex">
        {nothingSpentYet && <h2>nothing spent this month yet</h2>}
        {!nothingSpentYet && (
          <div className="currentMonth">
            {currentMonthDetails.map((v) => (
              <>
                <div
                  style={{ width: `${v.amount * 2}px` }}
                  className={`${v.category} spendMeItem`}
                  key={v._id + Math.random()}
                >
                  {v.category}
                  <span class="spendTitle">{v.amount}</span>
                </div>

                <div key={v._id + Math.random()}></div>
              </>
            ))}
          </div>
        )}

        {addSpendMe && (
          <div>
            <input type="text" ref={currentSpendMeAmount} />
            <div onClick={spendMeToDbHandler}>
              add amount paid for {currentSpendMeItem.current}
            </div>
          </div>
        )}

        <div className="vertFlex">
          <div>
            {yearlySum ? yearlySum : <h3>nothing bought this year yet</h3>}
          </div>

          <h2>add a spendMe</h2>
          {spendMeCategories.map((v) => (
            <div
              key={v}
              onClick={() => {
                addSpendMeHandler(v);
              }}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
