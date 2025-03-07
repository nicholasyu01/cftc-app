Notes
- https://publicreporting.cftc.gov/d/6dca-aqww/visualization
- 

api doc
https://dev.socrata.com/foundry/publicreporting.cftc.gov/6dca-aqww
data visualizer
https://publicreporting.cftc.gov/d/6dca-aqww/visualization


token: Txi2dCSz4EEfgf4CSfmnUplov

TODO:
- get data
- filter data
- get weekly data
- compare weekly data
- add filter options
- add multi kpi differences 
- add correct kpis (Positions, Changes, Percent of Open Interest, Number of Traders)
    - Percent of Open Interest
        - non commercial
            - long
            - short
        - commercial 
            - long
            - short
- deploy

PALLADIUM - NEW YORK MERCANTILE EXCHANGE                                                                                                         Code-075651
Disaggregated Commitments of Traders - Futures Only, February 25, 2025                                                                                       
-------------------------------------------------------------------------------------------------------------------------------------------------------------
     :          :                                              Reportable Positions                                                      :   Nonreportable
     :          :  Producer/Merchant/ :                                :                                :                                :     Positions
     :   Open   :   Processor/User    :          Swap Dealers          :         Managed Money          :       Other Reportables        :
     : Interest :   Long   :  Short   :   Long   :  Short   :Spreading :   Long   :  Short   :Spreading :   Long   :  Short   :Spreading :   Long  :  Short
-------------------------------------------------------------------------------------------------------------------------------------------------------------
     :          :(CONTRACTS OF 100 TROY OUNCES)                                                                                          :
     :          :    Positions                                                                                                           :
All  :    18,860:     1,269      1,549      7,024        124        178      3,232     13,392        696      3,460      1,434        222:    2,779     1,265
Old  :    18,860:     1,269      1,549      7,024        124        178      3,232     13,392        696      3,460      1,434        222:    2,779     1,265
Other:         0:         0          0          0          0          0          0          0          0          0          0          0:        0         0
     :          :                                                                                                                        :
     :          :    Changes in Commitments from:       February 18, 2025                                                                :
     :    -1,451:       373       -680        317       -592       -141       -517      2,510     -1,843        188       -336       -277:      449       -92
     :          :                                                                                                                        :
     :          :    Percent of Open Interest Represented by Each Category of Trader                                                     :
All  :     100.0:       6.7        8.2       37.2        0.7        0.9       17.1       71.0        3.7       18.3        7.6        1.2:     14.7       6.7
Old  :     100.0:       6.7        8.2       37.2        0.7        0.9       17.1       71.0        3.7       18.3        7.6        1.2:     14.7       6.7
Other:     100.0:       0.0        0.0        0.0        0.0        0.0        0.0        0.0        0.0        0.0        0.0        0.0:      0.0       0.0
     :          :                                                                                                                        :
     :          :    Number of Traders in Each Category                                                                                  :
All  :       161:         6          6         22          .         11         23         46         18         40         15          6:
Old  :       161:         6          6         22          .         11         23         46         18         40         15          6:
Other:         0:         0          0          0          0          0          0          0          0          0          0          0:
     :-------------------------------------------------------------------------------------------------------------------------------------------------------
     :             Percent of Open Interest Held by the Indicated Number of the Largest Traders
     :                          By Gross Position                       By Net Position
     :               4 or Less Traders     8 or Less Traders     4 or Less Traders     8 or Less Traders
     :                 Long:     Short       Long      Short:      Long      Short       Long      Short
     :----------------------------------------------------------------------------------------------------
All  :                 25.6       28.9       38.6       44.2       25.5       28.8       38.4       44.2
Old  :                 25.6       28.9       38.6       44.2       25.5       28.8       38.4       44.2
Other:                  0.0        0.0        0.0        0.0        0.0        0.0        0.0        0.0

18,860 = All long and Spreading 
18,860 = tot_rept_positions_long_all +  nonrept_positions_long_all



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
