from crypt import methods
import os
from flask import Flask,request,jsonify
from flask_cors import CORS
import requests
import time
import pandas as pd


app = Flask(__name__)
CORS(app)

@app.route('/',methods=["POST"])

def index():
    url = "https://api.upbit.com/v1/candles/days?"+str(14)
    data = request.get_json()
    querystring = {"market" :data["coin"], "count" : "300"}
    response = requests.request("GET", url, params=querystring)
    data = response.json()
    df =pd.DataFrame(data)
    df=df.reindex(index=df.index[::-1]).reset_index()
    nrsi=rsi_calc(df, 14).iloc[-1]
    rsi = round(nrsi)
    judgment = rsi_check(nrsi)
    return jsonify(str(rsi)+"%",str(judgment))

def rsi_check(nrsi):
        if nrsi <= 30:
            return '과매도'
        elif nrsi >= 30 <=70:
            return '중립'
        elif nrsi >=70:
            return '과매수'
            

def rsi_calc(ohlc: pd.DataFrame, period: int):
    ohlc["trad_price"] = ohlc["trade_price"]
    delta = ohlc["trade_price"].diff()
    gains, declines = delta.copy(), delta.copy()
    gains[gains < 0] = 0
    declines[declines > 0] = 0

    _gain = gains.ewm(com=(period-1), min_periods=period).mean()
    _loss = declines.abs().ewm(com=(period-1), min_periods=period).mean()

    RS = _gain / _loss
    return pd.Series(100-(100/(1+RS)), name="RSI")

 
 
 
 
 
if __name__ == '__main__':
    app.run(host='localhost', port=8080,debug=True)