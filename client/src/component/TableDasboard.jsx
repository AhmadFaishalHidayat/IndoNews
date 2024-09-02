import { Link } from "react-router-dom"



export default function TableDashboard({news, delNews}) {

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-md my-2 border-collapse border border-slate-500 border-solid">
                    {/* head */}
                    <thead className="border border-slate-600 bg-base-100">
                        <tr className="text-lg">
                            <th>No.</th>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Author</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-wrap border border-slate-600 bg-slate-100">
                        {/* row 1 */}
                        {news.map((el, idx) => (
                            <tr  key={el.id} className="text-wrap">
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">

                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJt080YseVVXjyH2pRpeLfOhTCEzFaMXivlg&s"
                                                    alt="Avatar Tailwind CSS Component" />



                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{el.title}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <a href="{el.url}" className="link" target="_blank" rel="noopener noreferrer">Link Url</a>
                                </td>

                                <td>
                                    {el.User.email}
                                </td>

                                <td className="flex">
                                    <Link to={`/news/edit/${el.id}`} className="btn btn-info btn-sm mr-3">
                                        Edit
                                    </Link>
                                    <div>
                                        <button className="btn btn-error btn-sm" onClick={() => document.getElementById('my_modal_1').showModal()}>Delete</button>
                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg">Hello!</h3>
                                                <p className="py-4">Are you sure you want to delete News: {el.name}?</p>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <div className="flex">
                                                            <button className="btn btn-error btn-sm mr-2" onClick={() => delNews(el.id)}>Delete</button>
                                                            <button className="btn btn-sm">Cancel</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}