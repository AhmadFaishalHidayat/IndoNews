


export default function FormEditAdd({namePage, handleSubmit, setTitle, title, setUrl, url}) {
    return(
        <>
            <form className="card-body mt-16" onSubmit={handleSubmit}>
                <h1 className="text-4xl">{namePage}</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title News" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Url News</span>
                    </label>
                    <input value={url}  onChange={(e) => setUrl(e.target.value)} type="text" placeholder="Url News" className="input input-bordered"  />
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sumbit</button>
                </div>
            </form>
        </>
    )
}