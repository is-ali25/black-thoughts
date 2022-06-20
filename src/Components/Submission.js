import SubmissionCSS from './Submission.module.css'

const Submission = ({formHandler, title, description, link, keywords, date, author, organization, location, relatedAuthors, citations, update}) => {
    return(
        <div className = {SubmissionCSS.submission}>
            <h1>Add Submission</h1>
            <form className = {SubmissionCSS.submissionForm} onSubmit={e => {formHandler(e)}}>
            <input type="text" name="title" placeholder="title" value={title} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <textarea type="text-area" name="description" placeholder="description" value={description} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="link" placeholder="link" value={link} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="keywords" placeholder="keywords" value={keywords} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="date" placeholder="date of publication" value={date} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="author" placeholder="author" value={author} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="organization" placeholder="organization" value={organization} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="location" placeholder="location" value={location} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="relatedAuthors" placeholder="related authors" value={relatedAuthors} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="citations" placeholder="citations" value={citations} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input className={SubmissionCSS.button} type="submit" placeholder="Submit"/>
            </form>
        </div>
    )
}

export default Submission