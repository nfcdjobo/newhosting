function ApparenceExpossition(params) {
    return (
        <div className="col-lg-12 col-md-12 col-xl-12">
            <div className="card mb-4">
                <h6 className="card-header text-center" id="vueTitre"></h6>
                <div className="card-body">
                    <img className="card-img-top" id="vueImage" style={{ height: "200px" }} />
                    <div className="card-body">
                        <p className="card-text" id="vueDescription"></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApparenceExpossition;