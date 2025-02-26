package com.ssafy.omg.config.baseresponse;

import static com.ssafy.omg.config.baseresponse.BaseResponseStatus.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"isSuccess", "code", "message", "result"})
public class BaseResponse<T> {
	@JsonProperty("isSuccess")
	private final Boolean isSuccess;
	private final String message;
	private final int code;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private T result;

	public BaseResponse(T result) {
		this.isSuccess = SUCCESS.isSuccess();
		this.message = SUCCESS.getMessage();
		this.code = SUCCESS.getCode();
		this.result = result;
	}

	public BaseResponse(BaseResponseStatus status) {
		this.isSuccess = status.isSuccess();
		this.message = status.getMessage();
		this.code = status.getCode();
	}
}