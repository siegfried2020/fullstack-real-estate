import Footer from "../general/footer";



export default function FrontendLayout({children}:{children:React.ReactNode}){
    return(
        <div>
            {children}
            <Footer/>
        </div>
    )
}