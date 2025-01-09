import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
const LegalComponents = ({post})=>{
return(
    <section className="Legals-components">
        <h1>{post.title}</h1>
        <article>
            <ReactMarkdown rehypePlugins={rehypeRaw}>
                {post.content}
            </ReactMarkdown>
        </article>
    </section>
)
}
export default LegalComponents