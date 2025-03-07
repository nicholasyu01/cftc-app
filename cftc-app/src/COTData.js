import React, { useState } from 'react';
import $ from 'jquery';
import './App.css';


function COTData() {
  const [data, setData] = useState(null);
  const [weeklyDifferenceData, setWeeklyDifferenceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportYear, setReportYear] = useState('2024'); // Default value
  const [reportWeek, setReportWeek] = useState('52'); // Default value

  const [startDate, setStartDate] = useState('2025-02-01');
  const [endDate, setEndDate] = useState('2025-02-09');

  // Separate states for commodity and commodity_name
  const [commodity, setCommodity] = useState(''); // Optional filter for commodity
  const [commodityName, setCommodityName] = useState(''); // Optional filter for commodity_name
  const [market, setMarket] = useState(''); // Optional filter for market
  const [exchange, setExchange] = useState(''); // Optional filter for exchange
  const [contractUnits, setContractUnits] = useState(''); // Optional filter for contract units
  const [commoditySubgroup, setCommoditySubgroup] = useState(''); // Optional filter for commodity subgroup
  const [commodityGroup, setCommodityGroup] = useState(''); // Optional filter for commodity group
  const [futonly, setFutonly] = useState(''); // Optional filter for futonly_or_combined
  const [cftcCommodityCode, setCftcCommodityCode] = useState(''); // Optional filter for cftc_commodity_code
  const [cftcContractMarketCode, setCftcContractMarketCode] = useState(''); // Optional filter for cftc_contract_market_code
  const [cftcMarketCode, setCftcMarketCode] = useState(''); // Optional filter for cftc_market_code
  const [cftcRegionCode, setCftcRegionCode] = useState(''); // Optional filter for cftc_region_code
  const [id, setId] = useState(''); // Optional filter for id
  const [contractMarketName, setContractMarketName] = useState(''); // Optional filter for contract_market_name

  const commodityOptions = ['GOLD', 'SILVER', 'COPPER',
    'CANADIAN DOLLAR', 'EURO FX', 'DJIA x $5', 'DOW JONES U.S. REAL ESTATE IDX', 'S&P 500 Consolidated', 'NASDAQ-100 Consolidated', 'USD INDEX', 'VIX FUTURES', 'BRITISH POUND', 'RUSSELL E-MINI', 'APANESE YEN' ];
  const commodityGroupOptions = ['FINANCIAL INSTRUMENTS', 'NATURAL RESOURCES', 'AGRICULTURE'];
  const fetchData = () => {
    if (!reportYear || !reportWeek) {
      alert('Please enter both report year and report week.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setWeeklyDifferenceData(null); // Reset weekly difference data


    // let whereClause = `(\`yyyy_report_week_ww\` = '${reportYear} Report Week ${reportWeek}')`;
    let whereClause = ` (\`report_date_as_yyyy_mm_dd\` >= '${startDate}' AND \`report_date_as_yyyy_mm_dd\` <= '${endDate}')`;

    // Add filters if provided
    if (market) whereClause += ` AND (\`market_and_exchange_names\` = '${market}')`;
    if (commodityName) whereClause += ` AND (\`commodity_name\` = '${commodityName}')`; // commodity_name filter
    if (commodity) whereClause += ` AND (\`commodity\` = '${commodity}')`; // commodity filter
    if (contractMarketName) whereClause += ` AND (\`contract_market_name\` = '${contractMarketName}')`; // contract_market_name filter
    if (cftcCommodityCode) whereClause += ` AND (\`cftc_commodity_code\` = '${cftcCommodityCode}')`;
    if (contractUnits) whereClause += ` AND (\`contract_units\` = '${contractUnits}')`;
    if (commoditySubgroup) whereClause += ` AND (\`commodity_subgroup_name\` = '${commoditySubgroup}')`;
    if (commodityGroup) whereClause += ` AND (\`commodity_group_name\` = '${commodityGroup}')`;
    if (futonly) whereClause += ` AND (\`futonly_or_combined\` = '${futonly}')`;
    if (cftcContractMarketCode) whereClause += ` AND (\`cftc_contract_market_code\` = '${cftcContractMarketCode}')`;
    if (cftcMarketCode) whereClause += ` AND (\`cftc_market_code\` = '${cftcMarketCode}')`;
    if (cftcRegionCode) whereClause += ` AND (\`cftc_region_code\` = '${cftcRegionCode}')`;
    if (id) whereClause += ` AND (\`id\` = '${id}')`;

    // Fetch data based on the selected filters and report year/week
    $.ajax({
      url: "https://publicreporting.cftc.gov/resource/6dca-aqww.json",
      type: "GET",
      data: {
        // $select: "report_date_as_yyyy_mm_dd,contract_market_name,noncomm_positions_long_all,ID",
        $select: "*",
        $where: whereClause,
        "$limit": 5000, // Limiting the number of records to 5000
        "$$app_token": "Txi2dCSz4EEfgf4CSfmnUplov" // Your app token for accessing the data
      },
      success: function (result) {
        console.log(result);
          const { groupedData, weeklyDifferenceData } = processData(result);
          setData(groupedData); // Set the raw data
          setWeeklyDifferenceData(weeklyDifferenceData); // Set the weekly difference data
          setLoading(false);
      },
      error: function (xhr, status, err) {
        setError(err);
        setLoading(false);
      }
    });
  };

  const processData = (data) => {
    const groupedData = {};
    
    // Group data by commodity name and keep relevant information for each commodity
    data.forEach((item) => {
      const date = item.report_date_as_yyyy_mm_dd.substring(0, 10);
      const commodity_name = item.commodity_name;

      // Ensure commodity_name exists in groupedData, if not, initialize it
      if (!groupedData[commodity_name]) {
        // groupedData[commodity_name] = {
        //   id: item.id,
        //   contract_market_name: item.contract_market_name,
        //   cftc_contract_market_code: item.cftc_contract_market_code,
        //   // Initialize a placeholder for the dates (we'll add data later)
        //   dates: {}
        // };
        groupedData[commodity_name] = item;
        groupedData[commodity_name].dates = {};
      }
  
      // Store long & short positions for the date
      if (!groupedData[commodity_name].dates[date]) {
        groupedData[commodity_name].dates[date] = {};
      }

      // Add the data for each date under the commodity
      groupedData[commodity_name].dates[date].open_interest_all = item.open_interest_all || 0;

      groupedData[commodity_name].dates[date].pct_of_oi_noncomm_long_all = item.pct_of_oi_noncomm_long_all || 0;
      groupedData[commodity_name].dates[date].pct_of_oi_noncomm_short_all = item.pct_of_oi_noncomm_short_all || 0;

      groupedData[commodity_name].dates[date].long = item.noncomm_positions_long_all || 0;
      groupedData[commodity_name].dates[date].short = item.noncomm_positions_short_all || 0;
    });
  
    // Now, calculate the weekly difference based on the stored data
    const weeklyDifferenceData = {};
    
    Object.entries(groupedData).forEach(([commodity, dataInfo]) => {
      const sortedDates = Object.keys(dataInfo.dates).sort(); // Sort the dates in ascending order
      
      // weeklyDifferenceData[commodity] = {
      //   id: dataInfo.id,
      //   contract_market_name: dataInfo.contract_market_name,
      //   cftc_contract_market_code: dataInfo.cftc_contract_market_code,
      //   differences: {}  // Store weekly differences for this commodity
      // };
      weeklyDifferenceData[commodity] = dataInfo;
      weeklyDifferenceData[commodity].differences = {};
      
      sortedDates.forEach((date, index) => {
        if (index === 0) {
          // For the first date, no previous data to compare, so set difference as 0
          weeklyDifferenceData[commodity].differences[date] = { 
            pct_of_oi_noncomm_long_all: 0,
            pct_of_oi_noncomm_short_all: 0,
            long: 0, short: 0 
          };
        } else {
          const prevDate = sortedDates[index - 1];
          const difference_open_interest_all = dataInfo.dates[date].open_interest_all - dataInfo.dates[prevDate].open_interest_all;

          const difference_pct_of_oi_noncomm_long_alll = dataInfo.dates[date].pct_of_oi_noncomm_long_all - dataInfo.dates[prevDate].pct_of_oi_noncomm_long_all;
          const difference_pct_of_oi_noncomm_short_all = dataInfo.dates[date].pct_of_oi_noncomm_short_all - dataInfo.dates[prevDate].pct_of_oi_noncomm_short_all;

          const differenceLong = dataInfo.dates[date].long - dataInfo.dates[prevDate].long;
          const differenceShort = dataInfo.dates[date].short - dataInfo.dates[prevDate].short;
  
          weeklyDifferenceData[commodity].differences[date] = {
            open_interest_all: difference_open_interest_all.toFixed(2),
            pct_of_oi_noncomm_long_all: difference_pct_of_oi_noncomm_long_alll.toFixed(2),
            pct_of_oi_noncomm_short_all: difference_pct_of_oi_noncomm_short_all.toFixed(2),
            long: differenceLong.toFixed(2),
            short: differenceShort.toFixed(2),
          };
  
        }
      });
    });
  
    return { groupedData, weeklyDifferenceData };
  };
  
  

  return (
    <div>
      <h1>Commitments of Traders Data</h1>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <br />
      <br />
      <br />

      <label>
        Commodity Group:
        <select value={commodityGroup} onChange={(e) => setCommodityGroup(e.target.value)}>
          <option value="">Select Commodity Group</option>
          {commodityGroupOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Commodity:
        <select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
          <option value="">Select Commodity</option>
          {commodityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <br />
      
      {/* <label>
        Report Year:
        <input
          type="text"
          value={reportYear}
          onChange={(e) => setReportYear(e.target.value)} // Update report year based on user input
          placeholder="e.g., 2024"
        />
      </label>
      <br />

      <label>
        Report Week:
        <input
          type="text"
          value={reportWeek}
          onChange={(e) => setReportWeek(e.target.value)} // Update report week based on user input
          placeholder="e.g., 52"
        />
      </label>
      <br /> */}

      <label>
        Commodity Name (optional):
        <input
          type="text"
          value={commodityName}
          onChange={(e) => setCommodityName(e.target.value)} // Update commodity_name filter based on user input
          placeholder="e.g., GOLD"
        />
      </label>
      <br />

      <label>
        Contract Market Name (optional):
        <input
          type="text"
          value={contractMarketName}
          onChange={(e) => setContractMarketName(e.target.value)} // Update contract_market_name filter based on user input
          placeholder="e.g., GOLD"
        />
      </label>
      <br />

      <label>
        Market (optional):
        <input
          type="text"
          value={market}
          onChange={(e) => setMarket(e.target.value)} // Update market filter based on user input
          placeholder="e.g., GOLD - COMMODITY EXCHANGE INC."
        />
      </label>
      <br />

      <label>
        Contract Units (optional):
        <input
          type="text"
          value={contractUnits}
          onChange={(e) => setContractUnits(e.target.value)} // Update contract units filter based on user input
          placeholder="e.g., (CONTRACTS OF 100 TROY OUNCES)"
        />
      </label>
      <br />

      <label>
        Commodity Subgroup (optional):
        <input
          type="text"
          value={commoditySubgroup}
          onChange={(e) => setCommoditySubgroup(e.target.value)} // Update commodity subgroup filter based on user input
          placeholder="e.g., PRECIOUS METALS"
        />
      </label>
      <br />

      <label>
        FutOnly or Combined (optional):
        <input
          type="text"
          value={futonly}
          onChange={(e) => setFutonly(e.target.value)} // Update futonly_or_combined filter based on user input
          placeholder="e.g., FutOnly"
        />
      </label>
      <br />

      <label>
        CFTC Commodity Code (optional):
        <input
          type="text"
          value={cftcCommodityCode}
          onChange={(e) => setCftcCommodityCode(e.target.value)} // Update cftc_commodity_code filter based on user input
          placeholder="e.g., 088"
        />
      </label>
      <br />

      <label>
        CFTC Contract Market Code (optional):
        <input
          type="text"
          value={cftcContractMarketCode}
          onChange={(e) => setCftcContractMarketCode(e.target.value)} // Update cftc_contract_market_code filter based on user input
          placeholder="e.g., 088691"
        />
      </label>
      <br />

      <label>
        CFTC Market Code (optional):
        <input
          type="text"
          value={cftcMarketCode}
          onChange={(e) => setCftcMarketCode(e.target.value)} // Update cftc_market_code filter based on user input
          placeholder="e.g., CMX"
        />
      </label>
      <br />

      <label>
        CFTC Region Code (optional):
        <input
          type="text"
          value={cftcRegionCode}
          onChange={(e) => setCftcRegionCode(e.target.value)} // Update cftc_region_code filter based on user input
          placeholder="e.g., NYC"
        />
      </label>
      <br />

      <label>
        ID (optional):
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)} // Update id filter based on user input
          placeholder="e.g., 250121088691F"
        />
      </label>
      <br />

      <button onClick={fetchData}>Fetch Data</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {/* {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.report_date_as_yyyy_mm_dd} : {item.market_and_exchange_names}: {item.nonrept_positions_long_all} 
            </li>
          ))}
        </ul>
      )} */}
{data && (
  <table border="1">
    <thead>
      <tr>
        <th>Commodity Name</th>
        <th>Contract Market Name</th>
        <th>CFTC Contract Market Code</th>
        {Object.keys(data[Object.keys(data)[0]].dates || {}).map((date) => (
          <>
            <th>{date} (open_interest_all)</th>
            <th>{date} (pct_of_oi_noncomm_long_all)</th>
            <th>{date} (pct_of_oi_noncomm_short_all)</th>
            <th>{date} (Long)</th>
            <th>{date} (Short)</th>
          </>
        ))}
      </tr>
    </thead>
    <tbody>
      {Object.entries(data).map(([commodity, info]) => (
        <tr>
          <td>{commodity}</td>
          <td>{info.contract_market_name}</td>
          <td>{info.cftc_contract_market_code}</td>
          {Object.keys(info.dates || {}).map((date) => (
            <>
              <td>{info.dates[date].open_interest_all || '-'}</td>
              <td>{info.dates[date].pct_of_oi_noncomm_long_all || '-'}</td>
              <td>{info.dates[date].pct_of_oi_noncomm_short_all || '-'}</td>
              <td>{info.dates[date].long || '-'}</td>
              <td>{info.dates[date].short || '-'}</td>
            </>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)}

{weeklyDifferenceData && (
  <table border="1">
    <thead>
      <tr>
        <th>Commodity Name</th>
        <th>Contract Market Name</th>
        <th>CFTC Contract Market Code</th>
        {Object.keys(weeklyDifferenceData[Object.keys(weeklyDifferenceData)[0]].differences || {}).map((date) => (
          <>
            <th>{date} (Δ open_interest_all)</th>
            <th>{date} (Δ pct_of_oi_noncomm_long_all)</th>
            <th>{date} (Δ pct_of_oi_noncomm_short_all)</th>
            <th>{date} (Δ Long)</th>
            <th>{date} (Δ Short)</th>
          </>
        ))}
      </tr>
    </thead>
    <tbody>
      {Object.entries(weeklyDifferenceData).map(([commodity, dataInfo]) => (
        <tr>
          <td>{commodity}</td>
          <td>{dataInfo.contract_market_name}</td>
          <td>{dataInfo.cftc_contract_market_code}</td>
          {Object.keys(dataInfo.differences || {}).map((date) => (
            <>
              <td
                className={dataInfo.differences[date].open_interest_all > 0 ? 'green' : dataInfo.differences[date].open_interest_all < 0 ? 'red' : ''}
              >
                {dataInfo.differences[date].open_interest_all || '-'}
              </td>

              <td
                className={dataInfo.differences[date].pct_of_oi_noncomm_long_all > 0 ? 'green' : dataInfo.differences[date].pct_of_oi_noncomm_long_all < 0 ? 'red' : ''}
              >
                {dataInfo.differences[date].pct_of_oi_noncomm_long_all || '-'}
              </td>
              <td
                className={dataInfo.differences[date].pct_of_oi_noncomm_short_all > 0 ? 'green' : dataInfo.differences[date].pct_of_oi_noncomm_short_all < 0 ? 'red' : ''}
              >
                {dataInfo.differences[date].pct_of_oi_noncomm_short_all || '-'}
              </td>

              <td
                className={dataInfo.differences[date].long > 0 ? 'green' : dataInfo.differences[date].long < 0 ? 'red' : ''}
              >
                {dataInfo.differences[date].long || '-'}
              </td>
              <td
                className={dataInfo.differences[date].short > 0 ? 'green' : dataInfo.differences[date].short < 0 ? 'red' : ''}
              >
                {dataInfo.differences[date].short || '-'}
              </td>
            </>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)}



    </div>
  );
}

export default COTData;
