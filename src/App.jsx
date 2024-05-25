import { useTable, useSortBy, usePagination } from "react-table"

const data = [
  {
    id: 3,
    gender: 'Male',
    salary: 52000
  },
  {
    id: 2,
    gender: 'Female',
    salary: 52100
  },
  {
    id: 1,
    gender: 'Robot',
    salary: 52200
  }
]

const columns = [
  {
    Header: "ID",
    accessor: "id"
  },

  {
    Header: "Gender",
    accessor: "gender"
  },

  {
    Header: "Salary",
    accessor: "salary"
  },

];

function App() {

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage,previousPage,canPreviousPage,canNextPage,state:{pageIndex},pageCount,gotoPage } = useTable({
    columns,
    data,
    initialState: { pageSize: 3}
  },
    useSortBy,
    usePagination)

  return (
    <>
      <table {...getTableProps}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {
                hg.headers.map((header) => (
                  <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                    {header.render("Header")}
                    {
                      header.isSorted ? (header.isSortedDesc ? ' 🔽' : ' 🔼') : ''
                    }
                  </th>
                ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            page.map((row) => {
              prepareRow(row);

              return <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  })
                }
              </tr>
            })
          }
        </tbody>
      </table>
      <div>
        <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button disabled={!canPreviousPage} onClick={previousPage}>Previous</button>

        <span>{pageIndex + 1} of {pageCount}</span>
        <button disabled={!canNextPage} onClick={nextPage}>Next</button>
        <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
    </>
  )
}

export default App
