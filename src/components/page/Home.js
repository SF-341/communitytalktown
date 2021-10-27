

//posts
import CreatePost from '../post/CreatePost'
import RenderPosts from '../post/RenderPosts';





const Home = () => {

    return (
        <>
            <div>
                <CreatePost />
                <RenderPosts />
            </div>
        </>
    )
}

export default Home;