/**
 * @jest-environment node
 */

import { usePageLoadingStatus } from "./usePageLoadingStatus";
import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import * as nextRouter from "next/router";

// 本テストで利用するのは`events`のみですが、NextRouter型に適合する必要があり一通りのプロパティを定義しています
const mockRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

const useRouter = jest.spyOn(nextRouter, "useRouter");
useRouter.mockImplementation(() => mockRouter);

describe("#usePageLoadingStatus", () => {
  it("遷移中のみtrueを返し、遷移完了後はfalseを返す", () => {
    const { result } = renderHook(() => usePageLoadingStatus());
    expect(result.current).toBe(false);

    act(() =>
      mockRouter.events.on.mock.calls.forEach(
        ([event, handler]) => event === "routeChangeStart" && handler()
      )
    );
    expect(result.current).toBe(true);

    act(() =>
      mockRouter.events.on.mock.calls.forEach(
        ([event, handler]) => event === "routeChangeComplete" && handler()
      )
    );
    expect(result.current).toBe(false);
  });

  it("遷移中のみtrueを返し、遷移エラー後はfalseを返す", () => {
    const { result } = renderHook(() => usePageLoadingStatus());
    expect(result.current).toBe(false);

    act(() =>
      mockRouter.events.on.mock.calls.forEach(
        ([event, handler]) => event === "routeChangeStart" && handler()
      )
    );
    expect(result.current).toBe(true);

    act(() =>
      mockRouter.events.on.mock.calls.forEach(
        ([event, handler]) => event === "routeChangeError" && handler()
      )
    );
    expect(result.current).toBe(false);
  });

  it("アンマウント後はイベントハンドラを取り除く", () => {
    renderHook(() => usePageLoadingStatus());
    cleanup();
    expect(mockRouter.events.off.mock.calls.length).toEqual(3);
    expect(mockRouter.events.off.mock.calls).toEqual(
      mockRouter.events.on.mock.calls
    );
  });
});
