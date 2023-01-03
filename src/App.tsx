import axios, { AxiosError } from "axios";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

const App = () => {
  const [numberOfItemsPerPage, setNumberOfItemPerPage] =
    React.useState<number>(10);
  const [comments, setComments] = React.useState<[Comment]>();
  const [numberOfPages, setNumberOfPages] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    axios
      .get<[Comment]>("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.data)
      .then((data) => {
        setIsError(false);
        setNumberOfPages(data.length / numberOfItemsPerPage);
        setComments(data);
      })
      .catch((e: AxiosError) => {
        console.log(e);
        setIsError(true);
      });
  }, []);

  return (
    <div>
      {/* <div>
        {Array.from(Array(numberOfPages), (_, i) => (
          <p key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </p>
        ))}
      </div> */}
      {!isError && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>postId</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((item, index) => {
              if (
                index >= (currentPage - 1) * numberOfItemsPerPage &&
                index < currentPage * numberOfItemsPerPage
              ) {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.name.length > 20
                        ? item.name.substring(0, 20) + "..."
                        : item.name}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.postId}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
      <p>
        You are currently on page
        <span onClick={() => setCurrentPage((page) => (page = 1))}>
          <ChevronDoubleLeftIcon className="h-5 w-5 text-slate-600 inline-block mx-1" />
        </span>
        <span
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((page) => page - 1);
            }
          }}
        >
          <ChevronLeftIcon className="h-5 w-5 text-slate-600 inline-block mx-1" />
        </span>
        <span className="mx-1">{currentPage}</span>
        <span
          onClick={() => {
            if (currentPage < numberOfPages) {
              setCurrentPage((page) => page + 1);
            }
          }}
        >
          <ChevronRightIcon className="h-5 w-5 text-slate-600 inline-block mx-1" />
        </span>
        <span onClick={() => setCurrentPage((page) => (page = numberOfPages))}>
          <ChevronDoubleRightIcon className="h-5 w-5 text-slate-600 inline-block mx-1" />
        </span>
        of {numberOfPages}
      </p>
    </div>
  );
};

export default App;
