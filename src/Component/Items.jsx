import Like from "./Like";

function Items({ videoTumbnail, title, tweet }) {
  return (
    <div className="space-y-5 w-[80vw] py-5 flex flex-col items-center">
      {videoTumbnail && (
        <>
          <img src={videoTumbnail} alt="" />
          <p>{title}</p>
        </>
      )}
      {tweet && (
        <article className="flex w-[80%] md:w-[60%] min-h-[125px] items-start gap-5 p-3 bg-zinc-700/20 rounded-md ">
          <img
            className="w-[50px] h-[50px] object-cover rounded-[100%]"
            src={tweet.ownerInfo.avatar}
            alt=""
          />
          <section className="grid grid-rows-2 items-end">
            <div className="flex flex-col gap-1">
              <span className="flex items-end gap-2">
                <h2 className="text-sm md:text-xl">
                  {tweet.ownerInfo.username}
                </h2>
                <p>{tweet.createdAt}</p>
              </span>
              <p className="text-md">{tweet.content}</p>
            </div>
            <Like />
          </section>
        </article>
      )}
    </div>
  );
}

export default Items;
