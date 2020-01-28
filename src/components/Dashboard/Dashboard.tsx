import React, { Fragment } from 'react'
import TopCard from '../../common/components/TopCard';

const Dashboard: React.FC = () => {
    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
            <p className="mb-4">Summary and overview of our admin stuff here</p>

            <div className="row">
                <TopCard title="TOTAL parcelS FOR TODAY" text="33" icon="box-open" class="success" />
                <TopCard title="parcelS THAT WERE SENT TODAY" text="22" icon="calendar-day" class="success" />
                <TopCard title="ACTIVE MESSENGERS" text="44" icon="signal" class="success" />
            </div>

            {/* <div className="row">
                <TopCard title="SALES" text={totalSales.toString()} icon="donate" class="primary" />
                <TopCard title="ORDER AMOUNT" text={totalOrderAmount.toString()} icon="calculator" class="danger" />
            </div>

            <div className="row">

                <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-green">Product list</h6>
                    </div>
                    <div className="card-body">
                    <ProductList />
                    </div>
                </div>

                </div>

                <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-green">Order list</h6>
                    </div>
                    <div className="card-body">
                    <OrderList />
                    </div>
                </div>
                </div>

            </div> */}

        </Fragment>
    )
}

export default Dashboard;
